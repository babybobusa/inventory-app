import { useEffect, useMemo, useRef, useState } from 'react'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'
import { alertMetaLines, isAlerting, isTimeAlertDue } from '../types'

const SEEN_KEY = 'inventory-alerts-seen-ids'

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

type AlertsMenuProps = {
  items: ItemRecord[]
  onAcknowledgeTimeAlerts?: (ids: string[]) => void | Promise<void>
}

export function AlertsMenu({ items, onAcknowledgeTimeAlerts }: AlertsMenuProps) {
  const [open, setOpen] = useState(false)
  const [seenIds, setSeenIds] = useState<Set<string>>(() => loadSeenIds())
  const wasOpen = useRef(false)

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

  useEffect(() => {
    if (open && !wasOpen.current) {
      const timeDueIds = items.filter((item) => isTimeAlertDue(item)).map((item) => item.id)
      if (timeDueIds.length && onAcknowledgeTimeAlerts) {
        void onAcknowledgeTimeAlerts(timeDueIds)
      }
    }
    wasOpen.current = open
  }, [open, items, onAcknowledgeTimeAlerts])

  function toggle() {
    setOpen((v) => !v)
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
                <li key={item.id}>
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
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
