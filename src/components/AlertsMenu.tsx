import { useEffect, useMemo, useState } from 'react'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'
import {
  alertMetaLines,
  isAlerting,
  isLowStock,
  isTimeAlertDue,
  TIME_ALERT_INTERVAL_DAYS,
} from '../types'

const SEEN_KEY = 'inventory-alerts-seen-ids'
const TIME_PROMPT =
  'Enter days: 15, 30, 45, 90, 180, or 365 — or 0 to turn off'

function loadSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

function saveSeenIds(ids: string[]) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids))
  } catch {
    // ignore quota / private mode
  }
}

function parseNonNegInt(raw: string | null): number | null {
  if (raw === null) return null
  const trimmed = raw.trim()
  if (trimmed === '') return null
  const n = Number(trimmed)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.floor(n)
}

export type AlertResetPatch = {
  quantity?: number
  lowStockAlertEnabled?: boolean
  timeAlertEnabled?: boolean
  timeAlertIntervalDays?: number
  timeAlertAnchorAt?: number
}

type AlertsMenuProps = {
  items: ItemRecord[]
  onResetAlert?: (id: string, patch: AlertResetPatch) => void | Promise<void>
}

export function AlertsMenu({ items, onResetAlert }: AlertsMenuProps) {
  const [open, setOpen] = useState(false)
  const [seenIds, setSeenIds] = useState<Set<string>>(() => loadSeenIds())

  const alerting = useMemo(
    () =>
      items
        .filter((item) => isAlerting(item))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })),
    [items],
  )

  const showDot = useMemo(() => {
    if (alerting.length === 0) return false
    return alerting.some((item) => !seenIds.has(item.id))
  }, [alerting, seenIds])

  useEffect(() => {
    if (!open) return
    const ids = alerting.map((item) => item.id)
    saveSeenIds(ids)
    setSeenIds(new Set(ids))
  }, [open, alerting])

  function toggle() {
    setOpen((v) => !v)
  }

  function handleReset(item: ItemRecord) {
    const patch: AlertResetPatch = {}
    let touched = false

    if (isLowStock(item)) {
      const qty = parseNonNegInt(
        window.prompt('New quantity', String(item.quantity)),
      )
      if (qty === null) {
        // cancel / empty / invalid — skip quantity changes
      } else if (qty === 0) {
        patch.quantity = 0
        patch.lowStockAlertEnabled = false
        touched = true
      } else {
        patch.quantity = qty
        touched = true
      }
    }

    if (isTimeAlertDue(item)) {
      const days = parseNonNegInt(window.prompt(TIME_PROMPT, String(item.timeAlertIntervalDays || 30)))
      if (days === null) {
        // cancel / empty / invalid
      } else if (days === 0) {
        patch.timeAlertEnabled = false
        patch.timeAlertIntervalDays = 0
        patch.timeAlertAnchorAt = 0
        touched = true
      } else if ((TIME_ALERT_INTERVAL_DAYS as readonly number[]).includes(days)) {
        patch.timeAlertEnabled = true
        patch.timeAlertIntervalDays = days
        patch.timeAlertAnchorAt = Date.now()
        touched = true
      }
      // invalid positive day value → ignore time changes
    }

    if (touched) void onResetAlert?.(item.id, patch)
  }

  return (
    <div className="alerts-wrap">
      <button
        type="button"
        id="btn-alerts"
        name="alerts"
        className="icon-btn alerts-btn"
        aria-label="Alerts"
        aria-expanded={open}
        aria-controls="alerts-panel"
        onClick={toggle}
      >
        ⚠
        {showDot ? <span id="alerts-dot" className="alerts-dot" aria-hidden="true" /> : null}
      </button>
      {open ? (
        <div className="alerts-panel" id="alerts-panel" role="menu">
          <div className="alerts-panel-head">Alerts</div>
          {alerting.length === 0 ? (
            <p className="alerts-empty" id="alerts-empty">
              No alerts right now
            </p>
          ) : (
            <ul className="alerts-list">
              {alerting.map((item) => (
                <li key={item.id} className="alerts-item-row">
                  <button
                    type="button"
                    className="alerts-item"
                    id={`alert-item-${item.id}`}
                    onClick={() => {
                      setOpen(false)
                      navigate(`/items/${item.id}`)
                    }}
                  >
                    <span className="alerts-item-name">{item.name}</span>
                    <span className="alerts-item-meta">{alertMetaLines(item)}</span>
                  </button>
                  <button
                    type="button"
                    className="alerts-reset-btn"
                    id={`alert-reset-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      handleReset(item)
                    }}
                  >
                    Reset
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
