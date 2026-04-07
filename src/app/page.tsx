'use client'

// KNMP - Koperasi Nusantara Merah Putih
// Platform Ekosistem JE-P3 × KNMP

import { Hero } from '@/components/sections/Hero'
import { StatsSection } from '@/components/sections/StatsSection'
import { EcosystemSection } from '@/components/sections/EcosystemSection'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { UnitUsahaSection } from '@/components/sections/UnitUsahaSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { VisiMisiSection } from '@/components/sections/VisiMisiSection'
import { MarketplaceSection } from '@/components/sections/MarketplaceSection'
import { LogistikSection } from '@/components/sections/LogistikSection'
import { SmartVillageSection } from '@/components/sections/SmartVillageSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Visi & Misi Section */}
      <VisiMisiSection />

      {/* Stats Section */}
      <StatsSection />

      {/* 6 KPA Section */}
      <EcosystemSection />

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
