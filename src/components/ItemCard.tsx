import { money } from '../money'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'
import { isLowStock, MAX_PHOTOS } from '../types'
import { PhotoThumb } from './PhotoThumb'

type ItemCardProps = {
  item: ItemRecord
}

export function ItemCard({ item }: ItemCardProps) {
  const photoSlots =
    item.photoCount > 0
      ? Array.from(
          { length: Math.min(MAX_PHOTOS, item.photoCount) },
          (_, i) => i,
        )
      : []

  return (
    <button
      type="button"
      className="item-card"
      id={`item-card-${item.id}`}
      onClick={() => navigate(`/items/${item.id}`)}
    >
      <div className="item-card-photos" aria-hidden={photoSlots.length === 0}>
        {photoSlots.length === 0 ? (
          <PhotoThumb
            id={item.id}
            hasPhoto={false}
            alt=""
            className="item-card-photo"
          />
        ) : (
          <>
            <div
              className={`item-card-photo-strip item-card-photo-strip--${photoSlots.length}`}
            >
              {photoSlots.map((slot) => (
                <PhotoThumb
                  key={slot}
                  id={item.id}
                  hasPhoto
                  slot={slot}
                  alt=""
                  className="item-card-photo"
                />
              ))}
            </div>
            {item.photoCount > 1 ? (
              <span className="item-card-photo-count" aria-label={`${item.photoCount} photos`}>
                {item.photoCount}
              </span>
            ) : null}
          </>
        )}
      </div>
      <div className="item-card-body">
        <div className="item-card-name">
          {item.name}
          {isLowStock(item) ? (
            <span className="chip chip-low" id={`item-low-badge-${item.id}`}>
              Low
            </span>
          ) : null}
        </div>
        <div className="item-card-meta">
          <span>Qty {item.quantity}</span>
          <span>{money(item.cost)}</span>
          <span className="markup">{money(item.recommendedPrice)}</span>
        </div>
        <div className="item-card-tags">
          <span className="chip">{item.location || 'TBD'}</span>
          {item.application ? <span className="chip chip-alt">{item.application}</span> : null}
        </div>
      </div>
    </button>
  )
}
