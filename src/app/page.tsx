'use client'

// KMN BERDIKARI - Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih Indonesia
// Platform Ekosistem NB × KMN BERDIKARI

import { Hero } from '@/components/sections/Hero'
import { StatsSection } from '@/components/sections/StatsSection'
import { KPASection } from '@/components/sections/KPASection'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { UnitUsahaSection } from '@/components/sections/UnitUsahaSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { VisiMisiSection } from '@/components/sections/VisiMisiSection'
import { MarketplaceSection } from '@/components/sections/MarketplaceSection'
import { LogistikSection } from '@/components/sections/LogistikSection'
import { SmartVillageSection } from '@/components/sections/SmartVillageSection'
import { PilarSection } from '@/components/sections/PilarSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Visi & Misi Section */}
      <VisiMisiSection />

      {/* Stats Section */}
      <StatsSection />

      {/* 9 Pilar Kampung */}
      <PilarSection />

      {/* 5 KPA Pentagon Kedaulatan */}
      <KPASection />

      {/* Unit Usaha Section */}
      <UnitUsahaSection />

      {/* Marketplace Section */}
      <MarketplaceSection />

      {/* Logistik Section */}
      <LogistikSection />

      {/* Smart Village Section */}
      <SmartVillageSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials & Partners */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection />
    </main>
  )
}
