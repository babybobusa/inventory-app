import { money } from '../money'
import { navigate } from '../nav'
import type { ItemRecord } from '../types'
import { PhotoThumb } from './PhotoThumb'

type ItemCardProps = {
  item: ItemRecord
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <button
      type="button"
      className="item-card"
      id={`item-card-${item.id}`}
      onClick={() => navigate(`/items/${item.id}`)}
    >
      <PhotoThumb
        id={item.id}
        hasPhoto={item.hasPhoto}
        alt=""
        className="item-card-photo"
      />
      <div className="item-card-body">
        <div className="item-card-name">{item.name}</div>
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
