import { site } from 'lib/catalog'

export const metadata = {
  title: 'Contact & Donasi'
}

export default function ContactPage() {
  return (
    <main className="container page-shell">
      <section className="page-header soft-card">
        <span className="hero-chip">Contact & Donasi</span>
        <h1>Hubungi RAFZ API</h1>
        <p>Kalau butuh support, request endpoint, atau mau donasi, bisa lewat kontak di bawah.</p>
      </section>

      <div className="contact-grid">
        <section className="soft-card contact-card">
          <h2>Kontak</h2>

          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">Email</div>
              <a href={`mailto:${site.contact.email}`} className="contact-link">{site.contact.email}</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4Z" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M8 16H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">Telegram</div>
              <a href={`https://t.me/${site.contact.telegram}`} target="_blank" className="contact-link">@{site.contact.telegram}</a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.5 5H17.5C18.8807 5 20 6.11929 20 7.5V16.5C20 17.8807 18.8807 19 17.5 19H6.5C5.11929 19 4 17.8807 4 16.5V7.5C4 6.11929 5.11929 5 6.5 5Z" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M8 9.5C8 8.67157 8.67157 8 9.5 8H14.5C15.3284 8 16 8.67157 16 9.5V14.5C16 15.3284 15.3284 16 14.5 16H9.5C8.67157 16 8 15.3284 8 14.5V9.5Z" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </div>
            <div>
              <div className="contact-label">WhatsApp</div>
              <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" className="contact-link">{site.contact.whatsapp}</a>
            </div>
          </div>
        </section>

        <section className="soft-card contact-card">
          <h2>Donasi QRIS</h2>
          <p>Taruh file QRIS di <code>/public/images/qris-donasi.png</code>.</p>
          <div className="donation-box">
            <img src="/images/qris-donasi.png" alt="QRIS Donasi RAFZ API" className="donation-image" />
          </div>
        </section>
      </div>
    </main>
  )
}
