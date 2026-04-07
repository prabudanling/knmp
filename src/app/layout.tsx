import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Header, Footer } from '@/components/layout'
import { SITE_CONFIG } from '@/constants'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.seo.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seo.description,
  keywords: SITE_CONFIG.seo.keywords,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.seo.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    images: [SITE_CONFIG.seo.ogImage],
    creator: '@kopnusa_id',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          <div className="relative min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
