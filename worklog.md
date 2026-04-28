---
Task ID: 1
Agent: Main Agent
Task: Install KNMP repository from https://github.com/prabudanling/knmp into current Next.js project

Work Log:
- Cloned the KNMP repository from GitHub to /tmp/knmp
- Analyzed the project structure: Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui + Prisma
- Copied constants, types, data files from /tmp/knmp/src/ to project
- Copied layout components (Header.tsx, Footer.tsx) with full navigation and footer
- Copied all 14 section components (Hero, StatsSection, KPASection, HowItWorks, UnitUsahaSection, TestimonialsSection, FAQSection, CTASection, VisiMisiSection, MarketplaceSection, LogistikSection, SmartVillageSection, PilarSection, EcosystemSection)
- Copied pilar components for the 9 Pilar Kampung pages
- Copied public assets (logo-knmp-v2.png, logo-knmp.png, grid.svg, images/people/*.svg)
- Updated globals.css with KNMP KOPNUSA color system (Hijau PPP #008F3D, Merah Tua #8B0000, 7 tier colors)
- Updated layout.tsx with KNMP branding, metadata, ThemeProvider, Header/Footer
- Updated page.tsx with full KNMP homepage (13 sections)
- Copied and pushed Prisma schema with all KNMP models (Tier, KPA, User, Pendaftaran, Payment, etc.)
- Copied lib files (auth.ts, niak.ts, permissions.ts, midtrans.ts, resend.ts, utils-server.ts)
- Verified dev server running with 200 responses
- Lint passes with no errors

Stage Summary:
- KNMP project successfully installed and integrated
- Homepage at / route fully functional with all sections
- Database schema pushed with all KNMP models
- All components, data, constants, types, and assets in place
