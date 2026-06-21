import { apiCatalog, folders, site } from 'lib/catalog'

export const metadata = {
  title: 'Document Api'
}

export default function DocsPage() {
  return (
    <main className="container page-shell">
      <section className="page-header soft-card">
        <span className="hero-chip">Document Api</span>
        <h1>Dokumentasi RAFZ API</h1>
        <p>Base URL: <code>{site.baseUrl}</code></p>

        <pre className="code-block">
          <code>{JSON.stringify({ status: true, name: 'RAFZ API', result: {} }, null, 2)}</code>
        </pre>
      </section>

      {folders.map(folder => (
        <section key={folder.key} className="section-block">
          <div className="section-head">
            <h2>{folder.title}</h2>
            <p>Prefix folder: <code>/{folder.key}</code></p>
          </div>

          <div className="docs-stack">
            {apiCatalog[folder.key].map(item => (
              <article key={item.slug} className="soft-card doc-item">
                <div className="doc-top">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className={`method method-${item.method.toLowerCase()}`}>{item.method}</span>
                </div>

                <div className="doc-grid">
                  <div>
                    <div className="doc-label">Path</div>
                    <code>{item.path}</code>
                  </div>
                  <div>
                    <div className="doc-label">Parameter</div>
                    <div className="badge-wrap">
                      {item.params.length ? item.params.map(param => (
                        <span key={param} className="badge">{param}</span>
                      )) : <span className="badge">Tidak ada</span>}
                    </div>
                  </div>
                </div>

                <div className="doc-label">Contoh Request</div>
                <pre className="code-block">
                  <code>{item.sample}</code>
                </pre>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
