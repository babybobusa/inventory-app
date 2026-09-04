import { InventoryProvider, useInventory } from './hooks/useInventory'
import { usePath } from './hooks/usePath'
import { parseRoute } from './nav'
import { AddPage } from './pages/AddPage'
import { DetailPage } from './pages/DetailPage'
import { EditPage } from './pages/EditPage'
import { ListPage } from './pages/ListPage'

function Router() {
  const path = usePath()
  const route = parseRoute(path)
  const { loading, error } = useInventory()

  if (loading) {
    return (
      <div className="splash">
        <div className="splash-mark">▦</div>
        <p>Loading inventory…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="splash">
        <p>Could not open the local list.</p>
        <p className="muted">{error}</p>
      </div>
    )
  }

  if (route.name === 'add') return <AddPage />
  if (route.name === 'edit') return <EditPage id={route.id} />
  if (route.name === 'detail') return <DetailPage id={route.id} />
  return <ListPage />
}

export default function App() {
  return (
    <InventoryProvider>
      <Router />
    </InventoryProvider>
  )
}
