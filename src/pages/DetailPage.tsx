import { useEffect, useRef, useState } from 'react'
import { Header } from '../components/Header'
import { PhotoThumb } from '../components/PhotoThumb'
import { useInventory } from '../hooks/useInventory'
import { money } from '../money'
import { navigate } from '../nav'
import { isLowStock, MAX_PHOTOS } from '../types'

export function DetailPage({ id }: { id: string }) {
  const { getById } = useInventory()
  const item = getById(id)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const slots = item
    ? Array.from({ length: MAX_PHOTOS }, (_, i) => i).filter((i) => i < item.photoCount)
    : []

  useEffect(() => {
    setPhotoIndex(0)
  }, [id, item?.photoCount])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || slots.length <= 1) return

    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      const row = getComputedStyle(el).flexDirection.startsWith('row')
      const slide = (row ? first.offsetWidth : first.offsetHeight) + 10
      const offset = row ? el.scrollLeft : el.scrollTop
      const i = Math.round(offset / Math.max(slide, 1))
      setPhotoIndex(Math.max(0, Math.min(slots.length - 1, i)))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [slots.length])

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
        {slots.length === 0 ? (
          <PhotoThumb
            id={item.id}
            hasPhoto={false}
            alt={item.name}
            className="product-photo"
          />
        ) : (
          <div className="product-photos-wrap">
            {slots.length > 1 ? (
              <p className="detail-photo-count" id="detail-photo-count">
                Photo {photoIndex + 1} of {slots.length}
              </p>
            ) : null}
            <div
              ref={scrollerRef}
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
          </div>
        )}
        <div className="product-fields">
          <h2 className="product-name" id="detail-name">
            {item.name}
            {isLowStock(item) ? (
              <span className="chip chip-low" id="detail-low-badge">
                Low
              </span>
            ) : null}
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
            <div>
              <dt>Low stock alert</dt>
              <dd id="detail-low-stock">
                {item.lowStockAlertEnabled
                  ? `On — at or below ${item.lowStockThreshold}`
                  : 'Off'}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  )
}
