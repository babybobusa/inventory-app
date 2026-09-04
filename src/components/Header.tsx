import type { ReactNode } from 'react'
import { navigate } from '../nav'

type HeaderProps = {
  title: string
  backTo?: string
  right?: ReactNode
}

export function Header({ title, backTo, right }: HeaderProps) {
  return (
    <header className="app-header">
      {backTo ? (
        <button
          type="button"
          id="btn-back"
          name="back"
          className="icon-btn"
          aria-label="Go back"
          onClick={() => navigate(backTo)}
        >
          ←
        </button>
      ) : (
        <span className="header-mark" aria-hidden="true">
          ▦
        </span>
      )}
      <h1>{title}</h1>
      <div className="header-right">{right}</div>
    </header>
  )
}
