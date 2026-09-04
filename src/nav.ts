const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') || ''

export function withBase(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${BASE}${p}` || '/'
}

export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length)
    return rest.startsWith('/') ? rest : `/${rest}` || '/'
  }
  return pathname || '/'
}

export function navigate(to: string): void {
  const target = to.startsWith(BASE) || to === BASE ? to : withBase(to)
  window.history.pushState({}, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export type AppRoute =
  | { name: 'list' }
  | { name: 'add' }
  | { name: 'detail'; id: string }
  | { name: 'edit'; id: string }

export function parseRoute(pathname: string): AppRoute {
  const path = stripBase(pathname).replace(/\/+$/, '') || '/'
  if (path === '/add') return { name: 'add' }
  const edit = path.match(/^\/items\/([^/]+)\/edit$/)
  if (edit) return { name: 'edit', id: decodeURIComponent(edit[1]) }
  const detail = path.match(/^\/items\/([^/]+)$/)
  if (detail) return { name: 'detail', id: decodeURIComponent(detail[1]) }
  return { name: 'list' }
}
