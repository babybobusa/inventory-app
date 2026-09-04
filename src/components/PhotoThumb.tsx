import { usePhotoUrl } from '../hooks/usePhotoUrl'

type PhotoThumbProps = {
  id?: string
  hasPhoto: boolean
  alt: string
  className?: string
  previewUrl?: string | null
}

export function PhotoThumb({ id, hasPhoto, alt, className, previewUrl }: PhotoThumbProps) {
  const storedUrl = usePhotoUrl(previewUrl ? undefined : id, previewUrl ? false : hasPhoto)
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
