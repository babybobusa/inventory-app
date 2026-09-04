import { Header } from '../components/Header'
import { PhotoThumb } from '../components/PhotoThumb'
import { useInventory } from '../hooks/useInventory'
import { money } from '../money'
import { navigate } from '../nav'
import { MAX_PHOTOS } from '../types'

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

  const slots = Array.from({ length: MAX_PHOTOS }, (_, i) => i).filter(
    (i) => i < item.photoCount,
  )

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
        {slots.length === 0 ? (
          <PhotoThumb
            id={item.id}
            hasPhoto={false}
            alt={item.name}
            className="product-photo"
          />
        ) : (
          <div
            className={`product-photos${slots.length > 1 ? ' product-photos-multi' : ''}`}
            id="detail-photos"
          >
            {slots.map((slot) => (
              <PhotoThumb
                key={slot}
                id={item.id}
                hasPhoto
                slot={slot}
                alt={`${item.name} photo ${slot + 1}`}
                className="product-photo"
              />
            ))}
          </div>
        )}
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
