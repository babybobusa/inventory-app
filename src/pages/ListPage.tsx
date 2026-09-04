import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { AlertsMenu } from '../components/AlertsMenu'
import { Header } from '../components/Header'
import { ItemCard } from '../components/ItemCard'
import { useInventory } from '../hooks/useInventory'
import { money } from '../money'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'

type GroupBy = 'none' | 'location' | 'application'

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  )
}

function matchesSearch(item: ItemRecord, q: string): boolean {
  if (!q) return true
  const hay = [item.name, item.description, item.location, item.application]
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

export function ListPage() {
  const { items, exportJson, importJson } = useInventory()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [application, setApplication] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>('none')
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const importRef = useRef<HTMLInputElement>(null)

  const locations = useMemo(() => uniqueSorted(items.map((i) => i.location)), [items])
  const applications = useMemo(
    () => uniqueSorted(items.map((i) => i.application)),
    [items],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      if (!matchesSearch(item, q)) return false
      if (location && item.location !== location) return false
      if (application && item.application !== application) return false
      return true
    })
  }, [items, query, location, application])

  const filteredTotals = useMemo(() => {
    let qty = 0
    let cost = 0
    for (const item of filtered) {
      qty += item.quantity
      cost += item.cost * item.quantity
    }
    return { qty, cost }
  }, [filtered])

  const groups = useMemo(() => {
    if (groupBy === 'none') {
      return [{ key: '', items: filtered }]
    }
    const map = new Map<string, ItemRecord[]>()
    for (const item of filtered) {
      const key =
        (groupBy === 'location' ? item.location : item.application) || 'Ungrouped'
      const list = map.get(key) ?? []
      list.push(item)
      map.set(key, list)
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0], undefined, { sensitivity: 'base' }))
      .map(([key, groupItems]) => ({ key, items: groupItems }))
  }, [filtered, groupBy])

  async function handleExport() {
    try {
      const json = await exportJson()
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'inventory-backup.json'
      a.click()
      URL.revokeObjectURL(url)
      setStatus('Backup downloaded.')
      setMenuOpen(false)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Export failed.')
    }
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      const text = await file.text()
      const count = await importJson(text)
      setStatus(`Imported ${count} item${count === 1 ? '' : 's'}.`)
      setMenuOpen(false)
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Import failed.')
    }
  }

  return (
    <div className="page">
      <Header
        title="Inventory"
        right={
          <>
            <AlertsMenu items={items} />
            <button
              type="button"
              id="btn-menu"
              name="menu"
              className="icon-btn"
              aria-label="More actions"
              onClick={() => setMenuOpen((v) => !v)}
            >
              ⋯
            </button>
          </>
        }
      />

      {menuOpen && (
        <div className="menu-panel" id="more-menu">
          <button type="button" id="btn-export" name="export" onClick={() => void handleExport()}>
            Export backup
          </button>
          <button
            type="button"
            id="btn-import"
            name="import"
            onClick={() => importRef.current?.click()}
          >
            Import backup
          </button>
        </div>
      )}
      <input
        ref={importRef}
        id="import-file"
        name="importFile"
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={(e) => void handleImport(e)}
      />

      <div className="filters">
        <label className="sr-only" htmlFor="search-query">
          Search
        </label>
        <input
          id="search-query"
          name="search"
          type="search"
          placeholder="Search name, notes, location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-row">
          <label htmlFor="filter-location" className="sr-only">
            Location
          </label>
          <select
            id="filter-location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <label htmlFor="filter-application" className="sr-only">
            Application
          </label>
          <select
            id="filter-application"
            name="application"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          >
            <option value="">All applications</option>
            {applications.map((app) => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="group-by" className="sr-only">
          Group by
        </label>
        <select
          id="group-by"
          name="groupBy"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupBy)}
        >
          <option value="none">No grouping</option>
          <option value="location">Group by location</option>
          <option value="application">Group by application</option>
        </select>
      </div>

      {status ? <p className="status-line">{status}</p> : null}

      <p className="count-line" id="item-count">
        {filtered.length} item{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="list">
        {groups.map((group) => (
          <section key={group.key || 'all'} className="group">
            {group.key ? (
              <h2 className="group-head">
                {group.key}
                <span>{group.items.length}</span>
              </h2>
            ) : null}
            <div className="goods-grid">
              {group.items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 ? (
          <p className="empty">No items match. Try a different search or add a new item.</p>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="summary-bar" id="list-summary">
          <span id="list-summary-qty">Qty: {filteredTotals.qty}</span>
          <span className="summary-sep">|</span>
          <span id="list-summary-total">Total: {money(filteredTotals.cost)}</span>
        </div>
      ) : null}

      <button
        type="button"
        id="btn-add"
        name="add"
        className="fab"
        aria-label="Add item"
        onClick={() => navigate('/add')}
      >
        +
      </button>
    </div>
  )
}
