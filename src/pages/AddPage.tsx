import { Header } from '../components/Header'
import { ItemForm } from '../components/ItemForm'
import { useInventory } from '../hooks/useInventory'
import { navigate } from '../nav'
import type { ItemDraft } from '../types'

export function AddPage() {
  const { items, save } = useInventory()
  const locations = Array.from(new Set(items.map((i) => i.location).filter(Boolean)))
  const applications = Array.from(new Set(items.map((i) => i.application).filter(Boolean)))

  async function onSave(draft: ItemDraft, photo: Blob | null | undefined) {
    const item = await save(draft, { photo })
    navigate(`/items/${item.id}`)
  }

  return (
    <div className="page">
      <Header title="Add item" backTo="/" />
      <ItemForm
        mode="add"
        locations={locations}
        applications={applications}
        onSave={onSave}
        onCancel={() => navigate('/')}
      />
    </div>
  )
}
