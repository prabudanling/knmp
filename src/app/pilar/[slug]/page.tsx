import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { PilarPageContent } from '@/components/pilar/PilarPageContent'
import { PILAR_PROGRAMS } from '@/data/pilarPrograms'

// ─── Slug to Pilar Number Mapping ──────────────────────────────────────────────
const SLUG_MAP: Record<string, number> = {
  'kampung-digital': 1,
  'kampung-modal': 2,
  'kampung-industri': 3,
  'kampung-pangan': 4,
  'kampung-sehat': 5,
  'kampung-cerdas': 6,
  'kampung-niaga': 7,
  'kampung-hijau': 8,
  'kampung-wisata': 9,
}

// ─── Reverse Mapping (pilar number → slug) ─────────────────────────────────────
const NUMBER_TO_SLUG: Record<number, string> = Object.fromEntries(
  Object.entries(SLUG_MAP).map(([slug, num]) => [num, slug])
)

// ─── Generate Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pilarNumber = SLUG_MAP[slug]

  if (!pilarNumber) {
    return {
      title: 'Pilar Tidak Ditemukan',
    }
  }

  const pilar = PILAR_PROGRAMS.find((p) => p.number === pilarNumber)

  if (!pilar) {
    return {
      title: 'Pilar Tidak Ditemukan',
    }
  }

  const totalPrograms = pilar.klasterGroups.reduce(
    (sum, group) => sum + group.programs.length,
    0
  )

  return {
    title: `${pilar.title} (${pilar.adhikara}) — 9 Pilar Kampung KMN BERDIKARI`,
    description: `${pilar.title} adalah Pilar ${pilar.number} dari 9 Pilar Kampung KMN BERDIKARI dengan nama ${pilar.adhikara}. Memiliki ${totalPrograms} program dalam ${pilar.klasterGroups.length} ${pilar.klasterLabel.toLowerCase()} yang saling terintegrasi.`,
  }
}

// ─── Generate Static Params ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }))
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default async function PilarPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pilarNumber = SLUG_MAP[slug]

  if (!pilarNumber) {
    notFound()
  }

  return (
    <>
      <Header />
      <PilarPageContent pilarNumber={pilarNumber} />
      <Footer />
    </>
  )
}
