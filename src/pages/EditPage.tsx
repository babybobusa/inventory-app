import { Header } from '../components/Header'
import { ItemForm } from '../components/ItemForm'
import { useInventory } from '../hooks/useInventory'
import { navigate } from '../nav'
import type { PhotosChange } from '../storage/adapter'
import type { ItemDraft } from '../types'

export function EditPage({ id }: { id: string }) {
  const { items, getById, save, remove } = useInventory()
  const item = getById(id)
  const locations = Array.from(new Set(items.map((i) => i.location).filter(Boolean)))
  const applications = Array.from(new Set(items.map((i) => i.application).filter(Boolean)))

  if (!item) {
    return (
      <div className="page">
        <Header title="Edit item" backTo="/" />
        <p className="empty">This item was not found.</p>
      </div>
    )
  }

  async function onSave(draft: ItemDraft, photos: PhotosChange) {
    await save(draft, { id, photos })
    navigate(`/items/${id}`)
  }

  async function onDelete() {
    await remove(id)
    navigate('/')
  }

  return (
    <div className="page">
      <Header title="Edit item" backTo={`/items/${id}`} />
      <ItemForm
        mode="edit"
        initial={item}
        locations={locations}
        applications={applications}
        onSave={onSave}
        onDelete={onDelete}
        onCancel={() => navigate(`/items/${id}`)}
      />
    </div>
  )
}
