import { usePhotoUrl } from '../hooks/usePhotoUrl'

type PhotoThumbProps = {
  id?: string
  /** True when this slot should load a stored photo. */
  hasPhoto: boolean
  alt: string
  className?: string
  previewUrl?: string | null
  /** Photo slot index 0–2 (default 0 = primary). */
  slot?: number
}

export function PhotoThumb({
  id,
  hasPhoto,
  alt,
  className,
  previewUrl,
  slot = 0,
}: PhotoThumbProps) {
  const storedUrl = usePhotoUrl(
    previewUrl ? undefined : id,
    previewUrl ? false : hasPhoto,
    slot,
  )
  const url = previewUrl || storedUrl

  if (url) {
    return <img src={url} alt={alt} className={className} />
  }

  return (
    <div className={`photo-placeholder ${className ?? ''}`} aria-hidden="true">
      <span>No photo</span>
    </div>
  )
}
