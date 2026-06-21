import { apiCatalog, folders } from 'lib/catalog'

export const metadata = {
  title: 'List Rest Api'
}

export default function ApisPage() {
  return (
    <main className="container page-shell">
      <section className="page-header soft-card">
        <span className="hero-chip">List Rest Api</span>
        <h1>Daftar Endpoint RAFZ API</h1>
        <p>Semua endpoint dibagi ke 5 folder utama: downloader, uploader, tools, search, dan info.</p>
      </section>

      <div className="grid-cards">
        {folders.map(folder => (
          <section key={folder.key} className="soft-card doc-card">
            <div className="folder-top">
              <span className="folder-badge">/{folder.key}</span>
              <span className="folder-count">{apiCatalog[folder.key].length} endpoint</span>
            </div>
            <h2>{folder.title}</h2>
            <p>{folder.description}</p>

            <div className="endpoint-list">
              {apiCatalog[folder.key].map(item => (
                <div key={item.slug} className="endpoint-row">
                  <span className={`method method-${item.method.toLowerCase()}`}>{item.method}</span>
                  <code>{item.path}</code>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
