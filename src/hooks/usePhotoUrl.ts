import { useEffect, useState } from 'react'
import { inventoryDb } from '../storage/indexeddb'

export function usePhotoUrl(id: string | undefined, hasPhoto: boolean): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let objectUrl: string | undefined
    let cancelled = false

    if (!id || !hasPhoto) {
      setUrl(null)
      return
    }

    void (async () => {
      const blob = await inventoryDb.getPhoto(id)
      if (cancelled) return
      if (!blob) {
        setUrl(null)
        return
      }
      objectUrl = URL.createObjectURL(blob)
      if (cancelled) {
        URL.revokeObjectURL(objectUrl)
        return
      }
      setUrl(objectUrl)
    })()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [id, hasPhoto])

  return url
}
