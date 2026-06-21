import Link from 'next/link'
import { site } from 'lib/catalog'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-title">RAFZ API</div>
          <p className="footer-text">REST API gratis dengan endpoint singkat, tanpa login, siap deploy di Vercel.</p>
        </div>

        <div className="footer-links">
          <Link href="/docs" className="footer-link">Docs</Link>
          <Link href="/apis" className="footer-link">List API</Link>
          <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" className="footer-link">WhatsApp</a>
          <a href={`https://t.me/${site.contact.telegram}`} target="_blank" className="footer-link">Telegram</a>
          <a href={`mailto:${site.contact.email}`} className="footer-link">Email</a>
        </div>
      </div>
    </footer>
  )
}
