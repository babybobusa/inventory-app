import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { money, recommendedPrice } from '../money'
import type { PhotosChange } from '../storage/adapter'
import type { ItemDraft, ItemRecord } from '../types'
import {
  DEFAULT_LOW_STOCK_THRESHOLD,
  MAX_PHOTOS,
  TIME_ALERT_INTERVAL_DAYS,
  TIME_ALERT_INTERVAL_OPTIONS,
} from '../types'
import { PhotoThumb } from './PhotoThumb'

type ItemFormProps = {
  mode: 'add' | 'edit'
  initial?: ItemRecord
  locations: string[]
  applications: string[]
  onSave: (draft: ItemDraft, photos: PhotosChange) => Promise<void>
  onDelete?: () => Promise<void>
  onCancel: () => void
}

type SlotDraft = {
  file: File | null
  removed: boolean
}

function emptySlots(): SlotDraft[] {
  return Array.from({ length: MAX_PHOTOS }, () => ({ file: null, removed: false }))
}

function defaultInterval(initial?: ItemRecord): string {
  const n = initial?.timeAlertIntervalDays
  if (n && (TIME_ALERT_INTERVAL_DAYS as readonly number[]).includes(n)) return String(n)
  return '30'
}

export function ItemForm({
  mode,
  initial,
  locations,
  applications,
  onSave,
  onDelete,
  onCancel,
}: ItemFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [quantity, setQuantity] = useState(String(initial?.quantity ?? 1))
  const [cost, setCost] = useState(initial ? String(initial.cost) : '')
  const [location, setLocation] = useState(initial?.location ?? 'TBD')
  const [application, setApplication] = useState(initial?.application ?? '')
  const [lowStockAlertEnabled, setLowStockAlertEnabled] = useState(
    initial?.lowStockAlertEnabled ?? false,
  )
  const [lowStockThreshold, setLowStockThreshold] = useState(
    String(initial?.lowStockThreshold ?? DEFAULT_LOW_STOCK_THRESHOLD),
  )
  const [timeAlertEnabled, setTimeAlertEnabled] = useState(initial?.timeAlertEnabled ?? false)
  const [timeAlertInterval, setTimeAlertInterval] = useState(defaultInterval(initial))
  const [slots, setSlots] = useState<SlotDraft[]>(emptySlots)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [photoMessage, setPhotoMessage] = useState<string | null>(null)

  const existingCount = initial?.photoCount ?? 0

  const previewUrls = useMemo(
    () => slots.map((slot) => (slot.file ? URL.createObjectURL(slot.file) : null)),
    [slots],
  )

  useEffect(() => {
    return () => {
      for (const url of previewUrls) {
        if (url) URL.revokeObjectURL(url)
      }
    }
  }, [previewUrls])

  const costNumber = Number(cost)
  const rec = recommendedPrice(Number.isFinite(costNumber) ? costNumber : 0)

  function filledCount(): number {
    let n = 0
    for (let i = 0; i < MAX_PHOTOS; i += 1) {
      const slot = slots[i]
      const hadExisting = i < existingCount
      if (slot.file) n += 1
      else if (hadExisting && !slot.removed) n += 1
    }
    return n
  }

  function showExisting(index: number): boolean {
    const slot = slots[index]
    return index < existingCount && !slot.file && !slot.removed
  }

  function slotHasImage(index: number): boolean {
    return Boolean(slots[index].file) || showExisting(index)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Please enter a name.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const photos: PhotosChange = []
      for (let i = 0; i < MAX_PHOTOS; i += 1) {
        const slot = slots[i]
        if (slot.file) photos[i] = slot.file
        else if (slot.removed) photos[i] = null
        else photos[i] = undefined
      }

      let nextTimeEnabled = timeAlertEnabled
      let nextInterval = Number(timeAlertInterval) || 0
      let nextAnchor = initial?.timeAlertAnchorAt ?? 0

      if (!nextTimeEnabled) {
        nextInterval = 0
        nextAnchor = 0
      } else {
        if (!(TIME_ALERT_INTERVAL_DAYS as readonly number[]).includes(nextInterval)) {
          nextInterval = 30
        }
        const wasEnabled = Boolean(initial?.timeAlertEnabled)
        const prevInterval = Number(initial?.timeAlertIntervalDays) || 0
        if (!wasEnabled || prevInterval !== nextInterval) {
          nextAnchor = Date.now()
        } else if (!nextAnchor) {
          nextAnchor = Date.now()
        }
      }

      await onSave(
        {
          name,
          description,
          quantity: Number(quantity) || 0,
          cost: Number(cost) || 0,
          location,
          application,
          lowStockAlertEnabled,
          lowStockThreshold: Number(lowStockThreshold) || 0,
          timeAlertEnabled: nextTimeEnabled,
          timeAlertIntervalDays: nextTimeEnabled ? nextInterval : 0,
          timeAlertAnchorAt: nextAnchor,
        },
        photos,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.')
      setSaving(false)
    }
  }

  function onPhotoChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null
    if (!next) return

    const alreadyFilled = filledCount()
    const replacing = slotHasImage(index)
    if (!replacing && alreadyFilled >= MAX_PHOTOS) {
      setPhotoMessage(`You can add up to ${MAX_PHOTOS} photos per item.`)
      event.target.value = ''
      return
    }

    setPhotoMessage(null)
    setSlots((prev) => {
      const copy = prev.map((s) => ({ ...s }))
      copy[index] = { file: next, removed: false }
      return copy
    })
  }

  function clearSlot(index: number) {
    setPhotoMessage(null)
    setSlots((prev) => {
      const copy = prev.map((s) => ({ ...s }))
      copy[index] = { file: null, removed: true }
      return copy
    })
    const input = document.getElementById(`item-photo-${index + 1}`) as HTMLInputElement | null
    if (input) input.value = ''
  }

  return (
    <form id="item-form" name="item-form" className="item-form" onSubmit={handleSubmit} autoComplete="off">
      <fieldset className="photo-fieldset">
        <legend>Photos (up to {MAX_PHOTOS})</legend>
        <div className="photo-slots" id="item-photo-slots">
          {slots.map((_slot, index) => {
            const inputId = `item-photo-${index + 1}`
            const clearId = `item-clear-photo-${index + 1}`
            const preview = previewUrls[index]
            const existing = showExisting(index)
            return (
              <div className="photo-slot" key={inputId}>
                <label className="photo-picker" htmlFor={inputId}>
                  <PhotoThumb
                    id={initial?.id}
                    hasPhoto={existing}
                    slot={index}
                    previewUrl={preview}
                    alt={name ? `${name} photo ${index + 1}` : `Photo ${index + 1}`}
                    className="form-photo"
                  />
                  <span className="photo-picker-hint">
                    {slotHasImage(index) ? `Photo ${index + 1} — tap to change` : `Add photo ${index + 1}`}
                  </span>
                </label>
                <input
                  id={inputId}
                  name={`photo${index + 1}`}
                  className="sr-only photo-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onPhotoChange(index, e)}
                />
                {slotHasImage(index) ? (
                  <button
                    type="button"
                    id={clearId}
                    name={`clearPhoto${index + 1}`}
                    className="text-btn"
                    onClick={() => clearSlot(index)}
                  >
                    Remove photo {index + 1}
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
        <p className="photo-cap-hint" id="item-photo-cap">
          You can add up to {MAX_PHOTOS} photos per item.
        </p>
        {photoMessage ? (
          <p className="form-error" id="item-photo-limit-message" role="alert">
            {photoMessage}
          </p>
        ) : null}
      </fieldset>

      <label htmlFor="item-name">Name</label>
      <input
        id="item-name"
        name="name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="What is this?"
      />

      <label htmlFor="item-description">Description</label>
      <textarea
        id="item-description"
        name="description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notes, brand, size…"
      />

      <div className="form-row">
        <div>
          <label htmlFor="item-quantity">Quantity</label>
          <input
            id="item-quantity"
            name="quantity"
            type="number"
            inputMode="decimal"
            min={0}
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="item-cost">Cost</label>
          <input
            id="item-cost"
            name="cost"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
          />
        </div>
      </div>

      <label htmlFor="item-recommended-price">Recommended price (cost × 1.20)</label>
      <input
        id="item-recommended-price"
        name="recommendedPrice"
        type="text"
        readOnly
        value={money(rec)}
        tabIndex={-1}
      />

      <label htmlFor="item-location">Location</label>
      <input
        id="item-location"
        name="location"
        type="text"
        list="location-options"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="TBD"
      />
      <datalist id="location-options">
        {locations.map((loc) => (
          <option key={loc} value={loc} />
        ))}
      </datalist>

      <label htmlFor="item-application">Application</label>
      <input
        id="item-application"
        name="application"
        type="text"
        list="application-options"
        value={application}
        onChange={(e) => setApplication(e.target.value)}
        placeholder="e.g. Drywall finishing"
      />
      <datalist id="application-options">
        {applications.map((app) => (
          <option key={app} value={app} />
        ))}
      </datalist>

      <div className="low-stock-fields">
        <p className="alerts-section-label">Alerts</p>
        <label className="toggle-row" htmlFor="item-low-stock-alert">
          <span>Low stock alert</span>
          <input
            id="item-low-stock-alert"
            name="lowStockAlert"
            type="checkbox"
            checked={lowStockAlertEnabled}
            onChange={(e) => setLowStockAlertEnabled(e.target.checked)}
          />
        </label>
        <label htmlFor="item-low-stock-threshold">Alert when quantity is at or below</label>
        <input
          id="item-low-stock-threshold"
          name="lowStockThreshold"
          type="number"
          inputMode="numeric"
          min={0}
          step="any"
          value={lowStockThreshold}
          disabled={!lowStockAlertEnabled}
          onChange={(e) => setLowStockThreshold(e.target.value)}
        />

        <label className="toggle-row" htmlFor="item-time-alert">
          <span>Remind me on a schedule</span>
          <input
            id="item-time-alert"
            name="timeAlert"
            type="checkbox"
            checked={timeAlertEnabled}
            onChange={(e) => setTimeAlertEnabled(e.target.checked)}
          />
        </label>
        <label htmlFor="item-time-alert-interval">Remind every</label>
        <select
          id="item-time-alert-interval"
          name="timeAlertInterval"
          value={timeAlertInterval}
          disabled={!timeAlertEnabled}
          onChange={(e) => setTimeAlertInterval(e.target.value)}
        >
          {TIME_ALERT_INTERVAL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <button id="item-save" name="save" type="submit" className="primary-btn" disabled={saving}>
        {saving ? 'Saving…' : mode === 'add' ? 'Save item' : 'Save changes'}
      </button>
      <button id="item-cancel" name="cancel" type="button" className="secondary-btn" onClick={onCancel}>
        Cancel
      </button>
      {onDelete ? (
        <button
          id="item-delete"
          name="delete"
          type="button"
          className="danger-btn"
          onClick={() => {
            if (window.confirm('Delete this item? This cannot be undone.')) {
              void onDelete()
            }
          }}
        >
          Delete item
        </button>
      ) : null}
    </form>
  )
}
