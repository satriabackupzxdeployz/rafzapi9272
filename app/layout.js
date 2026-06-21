import './globals.css'
import Topbar from 'components/Topbar'
import Footer from 'components/Footer'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://api.rafztzy.eu.cc'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'RAFZ API',
    template: '%s | RAFZ API'
  },
  description: 'RAFZ API adalah REST API gratis dengan endpoint singkat, tanpa login, dan siap deploy di Vercel.',
  icons: {
    icon: '/images/icon-website.png',
    shortcut: '/images/icon-website.png',
    apple: '/images/icon-website.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="bg-layer" />
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
