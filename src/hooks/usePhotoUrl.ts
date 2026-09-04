import { useEffect, useState } from 'react'
import { inventoryDb } from '../storage/indexeddb'

/** Object URL for one stored photo slot (default slot 0 = primary). */
export function usePhotoUrl(
  id: string | undefined,
  hasPhoto: boolean,
  slot = 0,
): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let objectUrl: string | undefined
    let cancelled = false

    if (!id || !hasPhoto) {
      setUrl(null)
      return
    }

    void (async () => {
      const blob = await inventoryDb.getPhoto(id, slot)
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
  }, [id, hasPhoto, slot])

  return url
}

/** Object URLs for all stored photo slots (length 3; null where empty). */
export function usePhotoUrls(
  id: string | undefined,
  photoCount: number,
): (string | null)[] {
  const [urls, setUrls] = useState<(string | null)[]>([null, null, null])

  useEffect(() => {
    const objectUrls: string[] = []
    let cancelled = false

    if (!id || photoCount <= 0) {
      setUrls([null, null, null])
      return
    }

    void (async () => {
      const blobs = await inventoryDb.getPhotos(id)
      if (cancelled) return
      const next: (string | null)[] = [null, null, null]
      for (let i = 0; i < blobs.length; i += 1) {
        const blob = blobs[i]
        if (!blob) continue
        const u = URL.createObjectURL(blob)
        objectUrls.push(u)
        next[i] = u
      }
      if (cancelled) {
        for (const u of objectUrls) URL.revokeObjectURL(u)
        return
      }
      setUrls(next)
    })()

    return () => {
      cancelled = true
      for (const u of objectUrls) URL.revokeObjectURL(u)
    }
  }, [id, photoCount])

  return urls
}
