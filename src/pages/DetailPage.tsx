import { Header } from '../components/Header'
import { PhotoThumb } from '../components/PhotoThumb'
import { useInventory } from '../hooks/useInventory'
import { money } from '../money'
import { navigate } from '../nav'

export function DetailPage({ id }: { id: string }) {
  const { getById } = useInventory()
  const item = getById(id)

  if (!item) {
    return (
      <div className="page">
        <Header title="Item" backTo="/" />
        <p className="empty">This item was not found.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <Header
        title="Item"
        backTo="/"
        right={
          <button
            type="button"
            id="btn-edit"
            name="edit"
            className="text-btn header-edit"
            onClick={() => navigate(`/items/${item.id}/edit`)}
          >
            Edit
          </button>
        }
      />
      <article className="product">
        <PhotoThumb
          id={item.id}
          hasPhoto={item.hasPhoto}
          alt={item.name}
          className="product-photo"
        />
        <div className="product-fields">
          <h2 className="product-name" id="detail-name">
            {item.name}
          </h2>
          {item.description ? (
            <p className="product-desc" id="detail-description">
              {item.description}
            </p>
          ) : null}
          <dl className="facts">
            <div>
              <dt>Quantity</dt>
              <dd id="detail-quantity">{item.quantity}</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd id="detail-cost">{money(item.cost)}</dd>
            </div>
            <div>
              <dt>Recommended (20% markup)</dt>
              <dd id="detail-recommended-price">{money(item.recommendedPrice)}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd id="detail-location">{item.location || 'TBD'}</dd>
            </div>
            <div>
              <dt>Application</dt>
              <dd id="detail-application">{item.application || '—'}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  )
}
