import { money } from '../money'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'
import { isLowStock } from '../types'
import { PhotoThumb } from './PhotoThumb'

type ItemCardProps = {
  item: ItemRecord
}

export function ItemCard({ item }: ItemCardProps) {
  const hasPhoto = item.photoCount > 0
  const extraPhotos = Math.max(0, item.photoCount - 1)

  return (
    <button
      type="button"
      className="item-card"
      id={`item-card-${item.id}`}
      onClick={() => navigate(`/items/${item.id}`)}
    >
      <div className="item-card-photos" aria-hidden={!hasPhoto}>
        <PhotoThumb
          id={item.id}
          hasPhoto={hasPhoto}
          slot={0}
          alt=""
          className="item-card-photo"
        />
        {extraPhotos > 0 ? (
          <span
            className="item-card-photo-count"
            aria-label={`${item.photoCount} photos`}
          >
            +{extraPhotos}
          </span>
        ) : null}
      </div>
      <div className="item-card-body">
        <div className="item-card-name">
          <span className="item-card-name-text">{item.name}</span>
          {isLowStock(item) ? (
            <span className="chip chip-low" id={`item-low-badge-${item.id}`}>
              Low
            </span>
          ) : null}
        </div>
        <div className="item-card-qty">Qty {item.quantity}</div>
        <div className="item-card-prices">
          <span className="item-card-cost">{money(item.cost)}</span>
          <span className="item-card-sep"> / </span>
          <span className="markup">{money(item.recommendedPrice)}</span>
        </div>
        {item.description ? (
          <div className="item-card-desc">{item.description}</div>
        ) : null}
        <div className="item-card-location">{item.location || 'TBD'}</div>
      </div>
    </button>
  )
}
