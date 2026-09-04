import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { money, recommendedPrice } from '../money'
import type { ItemDraft, ItemRecord } from '../types'
import { PhotoThumb } from './PhotoThumb'

type ItemFormProps = {
  mode: 'add' | 'edit'
  initial?: ItemRecord
  locations: string[]
  applications: string[]
  onSave: (draft: ItemDraft, photo: Blob | null | undefined) => Promise<void>
  onDelete?: () => Promise<void>
  onCancel: () => void
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
  const [cost, setCost] = useState(
    initial ? String(initial.cost) : '',
  )
  const [location, setLocation] = useState(initial?.location ?? 'TBD')
  const [application, setApplication] = useState(initial?.application ?? '')
  const [file, setFile] = useState<File | null>(null)
  const [removePhoto, setRemovePhoto] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const costNumber = Number(cost)
  const rec = recommendedPrice(Number.isFinite(costNumber) ? costNumber : 0)
  const showExistingPhoto = Boolean(initial?.hasPhoto) && !file && !removePhoto

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Please enter a name.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      let photo: Blob | null | undefined
      if (file) photo = file
      else if (removePhoto) photo = null
      else photo = undefined
      await onSave(
        {
          name,
          description,
          quantity: Number(quantity) || 0,
          cost: Number(cost) || 0,
          location,
          application,
        },
        photo,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.')
      setSaving(false)
    }
  }

  function onPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null
    setFile(next)
    setRemovePhoto(false)
  }

  return (
    <form id="item-form" name="item-form" className="item-form" onSubmit={handleSubmit} autoComplete="off">
      <label className="photo-picker" htmlFor="item-photo">
        <PhotoThumb
          id={initial?.id}
          hasPhoto={showExistingPhoto}
          previewUrl={previewUrl}
          alt={name || 'Item photo'}
          className="form-photo"
        />
        <span className="photo-picker-hint">Tap to add or change photo</span>
      </label>
      <input
        id="item-photo"
        name="photo"
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={onPhotoChange}
      />
      {(showExistingPhoto || file) && (
        <button
          type="button"
          id="item-clear-photo"
          name="clearPhoto"
          className="text-btn"
          onClick={() => {
            setFile(null)
            setRemovePhoto(true)
            const input = document.getElementById('item-photo') as HTMLInputElement | null
            if (input) input.value = ''
          }}
        >
          Remove photo
        </button>
      )}

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
