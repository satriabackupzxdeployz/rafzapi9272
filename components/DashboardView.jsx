import Link from 'next/link'
import { allApis, apiCatalog, folders, site } from 'lib/catalog'

const stats = [
  { label: 'Folder API', value: '5' },
  { label: 'Total Endpoint', value: String(allApis.length) },
  { label: 'System Login', value: 'Off' },
  { label: 'Deploy', value: 'Vercel Ready' }
]

export default function DashboardView() {
  return (
    <main className="container page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-chip">Light • Clean • 3D</span>
          <h1 className="hero-title">RAFZ API</h1>
          <p className="hero-desc">
            REST API gratis dengan endpoint pendek, tanpa login, tampilan clean, dan dokumentasi rapi.
            Domain utama kamu tetap di <span className="text-cyan">{site.baseUrl}</span>.
          </p>

          <div className="hero-actions">
            <Link href="/docs" className="btn btn-primary">Buka Dokumentasi</Link>
            <Link href="/apis" className="btn btn-secondary">Lihat List API</Link>
          </div>

          <div className="hero-note">
            Pola endpoint: <code>{site.baseUrl}/folder-api/nama-endpoint</code>
          </div>
        </div>

        <div className="hero-art-wrap">
          <svg viewBox="0 0 540 420" className="hero-art" aria-hidden="true">
            <defs>
              <linearGradient id="heroA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0FD9FF" />
                <stop offset="100%" stopColor="#8CF5FF" />
              </linearGradient>
              <linearGradient id="heroB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFB14A" />
                <stop offset="100%" stopColor="#FF8A00" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="130" r="92" fill="url(#heroA)" opacity="0.22" />
            <circle cx="360" cy="250" r="110" fill="url(#heroB)" opacity="0.16" />
            <rect x="95" y="70" rx="28" ry="28" width="320" height="220" fill="white" />
            <rect x="95" y="70" rx="28" ry="28" width="320" height="220" fill="url(#heroA)" opacity="0.08" />
            <rect x="125" y="108" rx="12" width="120" height="18" fill="#0FD9FF" opacity="0.9" />
            <rect x="125" y="144" rx="10" width="210" height="12" fill="#D7F9FF" />
            <rect x="125" y="168" rx="10" width="178" height="12" fill="#D7F9FF" />
            <rect x="125" y="210" rx="18" width="110" height="40" fill="url(#heroB)" />
            <rect x="252" y="210" rx="18" width="130" height="40" fill="#E9FBFF" />
            <g transform="translate(355 95)">
              <rect rx="22" width="110" height="150" fill="#0F172A" />
              <rect x="15" y="20" rx="10" width="80" height="10" fill="#0FD9FF" />
              <rect x="15" y="50" rx="10" width="60" height="10" fill="white" opacity="0.85" />
              <rect x="15" y="74" rx="10" width="70" height="10" fill="white" opacity="0.6" />
              <rect x="15" y="108" rx="16" width="80" height="24" fill="url(#heroB)" />
            </g>
            <path d="M55 320C95 258 142 235 205 236C276 237 320 280 402 284C450 286 487 272 520 247" stroke="#0FD9FF" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(item => (
          <div key={item.label} className="soft-card stat-card">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Folder API</h2>
          <p>Minimal 5 folder API gratis sesuai request kamu.</p>
        </div>

        <div className="grid-cards">
          {folders.map(folder => (
            <article key={folder.key} className="soft-card folder-card">
              <div className="folder-top">
                <span className="folder-badge">/{folder.key}</span>
                <span className="folder-count">{apiCatalog[folder.key].length} endpoint</span>
              </div>
              <h3>{folder.title}</h3>
              <p>{folder.description}</p>
              <ul className="mini-list">
                {apiCatalog[folder.key].slice(0, 3).map(item => (
                  <li key={item.slug}>
                    <code>{item.path}</code>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-card example-card">
        <div className="section-head">
          <h2>Contoh Endpoint</h2>
          <p>Format pendek sesuai pola yang kamu minta.</p>
        </div>

        <div className="example-grid">
          <div className="code-panel">
            <div className="code-title">Downloader TikTok MP4</div>
            <pre className="code-block">
              <code>{site.baseUrl}/d/ttmp4?url=https://www.tiktok.com/@user/video/123</code>
            </pre>
          </div>

          <div className="code-panel">
            <div className="code-title">Uploader File</div>
            <pre className="code-block">
              <code>curl -X POST "{site.baseUrl}/u/file2url" -F "file=@demo.zip"</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}
