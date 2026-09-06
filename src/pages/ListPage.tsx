import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { AlertsMenu } from '../components/AlertsMenu'
import { Header } from '../components/Header'
import { ItemCard } from '../components/ItemCard'
import { useInventory } from '../hooks/useInventory'
import { money } from '../money'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'

type GroupBy = 'none' | 'location' | 'application'
type ViewMode = 'items' | 'locations'
type LayoutMode = 'list' | 'tile'

const LAYOUT_KEY = 'inventory-items-layout'

function readLayout(): LayoutMode {
  try {
    const v = localStorage.getItem(LAYOUT_KEY)
    if (v === 'list' || v === 'tile') return v
  } catch {
    /* ignore */
  }
  return 'tile'
}

function writeLayout(mode: LayoutMode) {
  try {
    localStorage.setItem(LAYOUT_KEY, mode)
  } catch {
    /* ignore */
  }
}

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

function locationKey(value: string): string {
  return value.trim() || 'TBD'
}

export function ListPage() {
  const { items, exportJson, importJson, acknowledgeTimeAlerts } = useInventory()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [application, setApplication] = useState('')
  const [groupBy, setGroupBy] = useState<GroupBy>('none')
  const [viewMode, setViewMode] = useState<ViewMode>('items')
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => readLayout())
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
      if (location && locationKey(item.location) !== locationKey(location)) return false
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

  const locationRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const map = new Map<string, { name: string; qty: number }>()
    for (const item of items) {
      if (!matchesSearch(item, q)) continue
      if (application && item.application !== application) continue
      const name = locationKey(item.location)
      const row = map.get(name) ?? { name, qty: 0 }
      row.qty += item.quantity
      map.set(name, row)
    }
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    )
  }, [items, query, application])

  const locationTotals = useMemo(() => {
    let qty = 0
    for (const row of locationRows) qty += row.qty
    return { count: locationRows.length, qty }
  }, [locationRows])

  function openLocation(name: string) {
    setLocation(name)
    setApplication('')
    setGroupBy('none')
    setViewMode('items')
  }

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

  const showingLocations = viewMode === 'locations'

  function chooseLayout(mode: LayoutMode) {
    setLayoutMode(mode)
    writeLayout(mode)
  }

  return (
    <div className="page">
      <Header
        title="Inventory"
        right={
          <>
            <AlertsMenu items={items} onAcknowledgeTimeAlerts={acknowledgeTimeAlerts} />
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

      <div className="view-toggle" id="view-toggle" role="tablist" aria-label="View mode">
        <button
          type="button"
          id="view-items"
          name="viewItems"
          role="tab"
          aria-selected={viewMode === 'items'}
          className={viewMode === 'items' ? 'view-tab is-active' : 'view-tab'}
          onClick={() => setViewMode('items')}
        >
          Items
        </button>
        <button
          type="button"
          id="view-locations"
          name="viewLocations"
          role="tab"
          aria-selected={viewMode === 'locations'}
          className={viewMode === 'locations' ? 'view-tab is-active' : 'view-tab'}
          onClick={() => setViewMode('locations')}
        >
          Locations
        </button>
      </div>

      {!showingLocations ? (
        <div
          className="view-toggle layout-toggle"
          id="layout-toggle"
          role="tablist"
          aria-label="Items layout"
        >
          <button
            type="button"
            id="view-layout-list"
            name="layoutList"
            role="tab"
            aria-selected={layoutMode === 'list'}
            className={layoutMode === 'list' ? 'view-tab is-active' : 'view-tab'}
            onClick={() => chooseLayout('list')}
          >
            List
          </button>
          <button
            type="button"
            id="view-layout-tile"
            name="layoutTile"
            role="tab"
            aria-selected={layoutMode === 'tile'}
            className={layoutMode === 'tile' ? 'view-tab is-active' : 'view-tab'}
            onClick={() => chooseLayout('tile')}
          >
            Tile
          </button>
        </div>
      ) : null}

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
        {showingLocations ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {status ? <p className="status-line">{status}</p> : null}

      {showingLocations ? (
        <>
          <p className="count-line" id="location-count">
            {locationRows.length} location{locationRows.length === 1 ? '' : 's'}
          </p>
          <ul className="location-list" id="location-list">
            {locationRows.map((row) => {
              const slug = encodeURIComponent(row.name)
              return (
                <li key={row.name}>
                  <button
                    type="button"
                    className="location-row"
                    id={`location-row-${slug}`}
                    onClick={() => openLocation(row.name)}
                  >
                    <span className="location-row-bullet" aria-hidden="true">
                      •
                    </span>
                    <span className="location-row-name">{row.name}</span>
                    <span className="location-row-qty" id={`location-qty-${slug}`}>
                      {row.qty}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {locationRows.length === 0 ? (
            <p className="empty">No locations match. Try a different search.</p>
          ) : null}
          {locationRows.length > 0 ? (
            <div className="summary-bar" id="locations-summary">
              <span id="locations-summary-count">Locations: {locationTotals.count}</span>
              <span className="summary-sep">|</span>
              <span id="locations-summary-qty">Qty: {locationTotals.qty}</span>
            </div>
          ) : null}
        </>
      ) : (
        <>
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
                <div
                  className={
                    layoutMode === 'list' ? 'goods-list' : 'goods-grid'
                  }
                >
                  {group.items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      layout={layoutMode}
                    />
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
        </>
      )}

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
