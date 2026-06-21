import Link from 'next/link'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/apis', label: 'List Rest Api' },
  { href: '/docs', label: 'Document Api' },
  { href: '/contact', label: 'Contact & Donasi' }
]

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M10 35L24 12L40 28L54 8L54 35C54 44.389 46.389 52 37 52H27C17.611 52 10 44.389 10 35Z" fill="url(#g1)" />
              <circle cx="25" cy="28" r="5" fill="white" />
              <circle cx="39" cy="24" r="5" fill="#0F172A" />
              <defs>
                <linearGradient id="g1" x1="10" y1="8" x2="54" y2="52" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0FD9FF" />
                  <stop offset="1" stopColor="#FF9A2B" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-text">RAFZ API</span>
        </Link>

        <nav className="nav">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
