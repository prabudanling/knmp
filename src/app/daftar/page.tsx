'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Star,
  MapPin,
  Building,
  Crown,
  CreditCard,
  Clock,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  User,
  Loader2,
  CheckCircle2,
  Mail,
  Download,
  Rocket,
  Landmark,
  Sparkles,
  BadgeCheck,
  Leaf,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface Tier {
  id: string;
  name: string;
  title: string; // Sebutan jabatan
  level: number;
  normalPrice: number;       // Harga normal
  earlyBirdPrice: number;    // Harga early bird (75% off)
  promoPrice: number;        // Promo Maret 2026 (95% off)
  discountPercent: number;
  description: string;
  benefits: string[];
  is_active: boolean;
  requires_location: boolean;
  is_free: boolean;
  special_requirement?: string;
}

interface RegistrationData {
  tier_id: string;
  tier_name: string;
  tier_price: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  nik?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'L' | 'P';
  alamat?: string;
  pekerjaan?: string;
  photo?: File | null;
  ktp_photo?: File | null;
  farm_photo?: File | null;
  province_id?: string;
  province_name?: string;
  regency_id?: string;
  regency_name?: string;
  district_id?: string;
  district_name?: string;
  village_id?: string;
  village_name?: string;
  company_name?: string;
  business_type?: string;
  npwp?: string;
  siup?: string;
  nib?: string;
  contact_person?: string;
  website?: string;
  investment_value?: number;
  payment_method?: string;
}

interface Location {
  id: string;
  name: string;
  code: string;
}

const STEPS = [
  { id: 1, name: 'Pilih Paket', description: 'Pilih tier keanggotaan' },
  { id: 2, name: 'Data Diri', description: 'Isi informasi personal' },
  { id: 3, name: 'Lokasi', description: 'Pilih wilayah' },
  { id: 4, name: 'Pembayaran', description: 'Pilih metode pembayaran' },
  { id: 5, name: 'Selesai', description: 'Pendaftaran berhasil' },
];

// Tier Icons dengan warna sesuai sistem
const tierIcons: Record<number, React.ReactNode> = {
  1: <Leaf className="w-8 h-8" />,         // Petani - Gray
  2: <BadgeCheck className="w-8 h-8" />,   // Anggota - Emerald
  3: <Building className="w-8 h-8" />,     // KORDES - Sky
  4: <Landmark className="w-8 h-8" />,     // KORCAM - Violet
  5: <Sparkles className="w-8 h-8" />,     // KORDA - Pink
  6: <Crown className="w-8 h-8" />,        // KORWIL - Gold
  7: <Rocket className="w-8 h-8" />,       // KORNAS - Red
};

// Warna tier sesuai spesifikasi user
const tierColors: Record<number, { main: string; soft: string; gradient: string }> = {
  1: { main: '#6B7280', soft: 'rgba(107, 114, 128, 0.10)', gradient: 'from-gray-500 to-gray-700' },
  2: { main: '#10B981', soft: 'rgba(16, 185, 129, 0.10)', gradient: 'from-emerald-500 to-emerald-700' },
  3: { main: '#0EA5E9', soft: 'rgba(14, 165, 233, 0.10)', gradient: 'from-sky-500 to-sky-700' },
  4: { main: '#7C3AED', soft: 'rgba(124, 58, 237, 0.10)', gradient: 'from-violet-500 to-violet-700' },
  5: { main: '#DB2777', soft: 'rgba(219, 39, 119, 0.10)', gradient: 'from-pink-500 to-pink-700' },
  6: { main: '#B7791F', soft: 'rgba(183, 121, 31, 0.12)', gradient: 'from-amber-500 to-amber-700' },
  7: { main: '#C81E1E', soft: 'rgba(200, 30, 30, 0.10)', gradient: 'from-red-600 to-red-800' },
};

// Tiers Data - HARGA SESUAI MEMBERSHIP PAGE ASLI
const mockTiers: Tier[] = [
  {
    id: '1',
    name: 'PETANI',
    title: 'Petani Koperasi',
    level: 1,
    normalPrice: 0,
    earlyBirdPrice: 0,
    promoPrice: 0,
    discountPercent: 0,
    description: 'Petani - Gratis bergabung dengan syarat KTP dan foto kebun',
    benefits: [
      'Kartu Anggota Digital (Blockchain Passport)',
      'Akses JE-P3 Academy Tingkat 1',
      'Akses Marketplace Basic',
      'Hak SHU dari Hasil Panen',
      'Gratis selamanya',
    ],
    is_active: true,
    requires_location: false,
    is_free: true,
    special_requirement: 'Wajib upload KTP dan foto kebun/pertanian',
  },
  {
    id: '2',
    name: 'ANGGOTA BIASA',
    title: 'Anggota Koperasi',
    level: 2,
    normalPrice: 1000000,       // Rp 1 Juta
    earlyBirdPrice: 250000,     // Rp 250 Ribu (75% off)
    promoPrice: 50000,          // Rp 50 Ribu (95% off)
    discountPercent: 95,
    description: 'Anggota Biasa - Hak suara di Munas',
    benefits: [
      'Semua benefit Petani',
      'Profil Direktori Pengusaha',
      'Prioritas Pelatihan Batch Awal',
      'Hak Suara di Munas',
    ],
    is_active: true,
    requires_location: false,
    is_free: false,
  },
  {
    id: '3',
    name: 'KORDES',
    title: 'Panglima Desa',
    level: 3,
    normalPrice: 10000000,      // Rp 10 Juta
    earlyBirdPrice: 2500000,    // Rp 2.5 Juta (75% off)
    promoPrice: 500000,         // Rp 500 Ribu (95% off)
    discountPercent: 95,
    description: 'Panglima Desa (KORDES) - Hak usaha logistik tingkat desa',
    benefits: [
      'Semua benefit Anggota Biasa',
      'Hak Prioritas Kemitraan Desa',
      'Agen Logistik (J&T, JNE, SiCepat)',
      'Hak SHU dari Koperasi KNMP',
      'Dashboard Agen Realtime',
    ],
    is_active: true,
    requires_location: true,
    is_free: false,
  },
  {
    id: '4',
    name: 'KORCAM',
    title: 'Panglima Camat',
    level: 4,
    normalPrice: 40000000,      // Rp 40 Juta
    earlyBirdPrice: 10000000,   // Rp 10 Juta (75% off)
    promoPrice: 2000000,        // Rp 2 Juta (95% off)
    discountPercent: 95,
    description: 'Panglima Camat (KORCAM) - Eksklusivitas kemitraan kecamatan',
    benefits: [
      'Semua benefit KORDES',
      'Hak Prioritas Kemitraan Kecamatan',
      'Koordinator Agen di Kecamatan',
      'Revenue Sharing dari Network Agen',
      'Konsultasi Bisnis 1-on-1',
    ],
    is_active: true,
    requires_location: true,
    is_free: false,
  },
  {
    id: '5',
    name: 'KORDA',
    title: 'Panglima Distrik',
    level: 5,
    normalPrice: 60000000,      // Rp 60 Juta
    earlyBirdPrice: 15000000,   // Rp 15 Juta (75% off)
    promoPrice: 3000000,        // Rp 3 Juta (95% off)
    discountPercent: 95,
    description: 'Panglima Distrik (KORDA) - Master Koordinator Kabupaten/Kota',
    benefits: [
      'Semua benefit KORCAM',
      'Hak Prioritas Kemitraan Kabupaten',
      'Master Koordinator Kabupaten',
      'Dedicated Account Manager',
      'Prioritas Proyek Pemerintah',
    ],
    is_active: true,
    requires_location: true,
    is_free: false,
  },
  {
    id: '6',
    name: 'KORWIL',
    title: 'Panglima Wilayah',
    level: 6,
    normalPrice: 400000000,     // Rp 400 Juta
    earlyBirdPrice: 100000000,  // Rp 100 Juta (75% off)
    promoPrice: 20000000,       // Rp 20 Juta (95% off)
    discountPercent: 95,
    description: 'Panglima Wilayah (KORWIL) - Regional Director Provinsi',
    benefits: [
      'Semua benefit KORDA',
      'Hak Prioritas Kemitraan Provinsi',
      'Regional Director Status',
      'Akses Dewan Nasional JE-P3',
      'Board Observer Rights',
    ],
    is_active: true,
    requires_location: true,
    is_free: false,
  },
  {
    id: '7',
    name: 'KORNAS',
    title: 'Panglima Besar',
    level: 7,
    normalPrice: 4000000000,    // Rp 4 Miliar
    earlyBirdPrice: 1000000000, // Rp 1 Miliar (75% off)
    promoPrice: 200000000,      // Rp 200 Juta (95% off)
    discountPercent: 95,
    description: 'Panglima Besar (KORNAS) - Badan Koordinasi Nasional / Pusat',
    benefits: [
      'Semua benefit KORWIL',
      'National Director Status',
      'Board of Directors Seat',
      'Strategic Committee Member',
      'Equity Stake Guaranteed',
      'Hak Veto Terbatas (Strategic)',
    ],
    is_active: true,
    requires_location: false,
    is_free: false,
  },
];

// Mock Provinces
const mockProvinces: Location[] = [
  { id: '1', name: 'Aceh', code: '11' },
  { id: '2', name: 'Sumatera Utara', code: '12' },
  { id: '3', name: 'Sumatera Barat', code: '13' },
  { id: '4', name: 'Riau', code: '14' },
  { id: '5', name: 'Jambi', code: '15' },
  { id: '6', name: 'DKI Jakarta', code: '31' },
  { id: '7', name: 'Jawa Barat', code: '32' },
  { id: '8', name: 'Jawa Tengah', code: '33' },
  { id: '9', name: 'DI Yogyakarta', code: '34' },
  { id: '10', name: 'Jawa Timur', code: '35' },
  { id: '11', name: 'Bali', code: '51' },
];

const paymentMethods = [
  { id: 'va_bca', name: 'BCA Virtual Account', icon: <Building className="w-6 h-6" />, fee: 4000 },
  { id: 'va_mandiri', name: 'Mandiri Virtual Account', icon: <Building className="w-6 h-6" />, fee: 4000 },
  { id: 'va_bni', name: 'BNI Virtual Account', icon: <Building className="w-6 h-6" />, fee: 4000 },
  { id: 'va_bri', name: 'BRI Virtual Account', icon: <Building className="w-6 h-6" />, fee: 4000 },
  { id: 'qris', name: 'QRIS', icon: <CreditCard className="w-6 h-6" />, fee: 700 },
  { id: 'gopay', name: 'GoPay', icon: <CreditCard className="w-6 h-6" />, fee: 0 },
];

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    tier_id: '',
    tier_name: '',
    tier_price: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    photo: null,
    ktp_photo: null,
    farm_photo: null,
  });

  const updateData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep === 2) {
      const tierId = parseInt(registrationData.tier_id);
      // Tier 1, 2, 7 don't require location
      if (tierId === 1 || tierId === 2 || tierId === 7) {
        // Jika gratis (tier 1), skip payment juga
        if (tierId === 1) {
          setCurrentStep(5); // Langsung selesai
          return;
        }
        setCurrentStep(4);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    if (currentStep === 5 && parseInt(registrationData.tier_id) === 1) {
      setCurrentStep(2);
      return;
    }
    if (currentStep === 4) {
      const tierId = parseInt(registrationData.tier_id);
      if (tierId === 1 || tierId === 2 || tierId === 7) {
        setCurrentStep(2);
        return;
      }
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'GRATIS';
    if (amount >= 1000000000) return `Rp${(amount / 1000000000).toFixed(0)} Miliar`;
    if (amount >= 1000000) return `Rp${(amount / 1000000).toFixed(0)} Juta`;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008F3D] to-[#006B2D] text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-green-200 hover:text-white text-sm flex items-center gap-1 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-4 mb-3">
            <div className="h-12 md:h-14 w-auto rounded-xl overflow-hidden bg-white shadow-lg p-0.5">
              <Image
                src="/logo-knmp.png"
                alt="KNMP Logo"
                width={1408}
                height={768}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Pendaftaran Anggota KNMP</h1>
          <p className="text-green-100">Bergabunglah dengan Koperasi Korporasi Multipihak Nusa Merah Putih</p>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#8B0000] to-[#C81E1E] text-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-3">
          <Percent className="w-6 h-6 animate-pulse" />
          <div className="text-center">
            <p className="font-bold text-lg">PROMO SPESIAL MARET 2026</p>
            <p className="text-sm text-red-100">Diskon 95% untuk semua tier keanggotaan!</p>
          </div>
          <Star className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Desktop Progress */}
          <div className="hidden md:flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: currentStep >= step.id ? '#008F3D' : '#E5E7EB',
                      scale: currentStep === step.id ? 1.1 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </motion.div>
                  <p className={`mt-2 text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.name}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 ${currentStep > step.id ? 'bg-[#008F3D]' : 'bg-gray-200'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Langkah {currentStep} dari {STEPS.length}</p>
              <p className="text-sm text-gray-500">{STEPS[currentStep - 1]?.name}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#008F3D] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="tier" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <TierSelection 
                tiers={mockTiers} 
                selectedTier={registrationData.tier_id} 
                onSelect={(tier) => updateData({ 
                  tier_id: tier.id, 
                  tier_name: tier.name, 
                  tier_price: tier.promoPrice 
                })} 
                onNext={nextStep} 
                formatCurrency={formatCurrency} 
              />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <PersonalInfoForm 
                data={registrationData} 
                tierId={registrationData.tier_id} 
                tier={mockTiers.find(t => t.id === registrationData.tier_id)} 
                onUpdate={updateData} 
                onNext={nextStep} 
                onBack={prevStep} 
              />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div key="location" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <LocationSelector 
                data={registrationData} 
                tierId={registrationData.tier_id} 
                provinces={mockProvinces} 
                onUpdate={updateData} 
                onNext={nextStep} 
                onBack={prevStep} 
              />
            </motion.div>
          )}
          {currentStep === 4 && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <PaymentSection 
                data={registrationData} 
                paymentMethods={paymentMethods} 
                onUpdate={updateData} 
                onSuccess={() => setCurrentStep(5)} 
                onBack={prevStep} 
                formatCurrency={formatCurrency} 
              />
            </motion.div>
          )}
          {currentStep === 5 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <RegistrationSuccess data={registrationData} formatCurrency={formatCurrency} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Tier Selection Component
function TierSelection({ 
  tiers, 
  selectedTier, 
  onSelect, 
  onNext, 
  formatCurrency 
}: { 
  tiers: Tier[]; 
  selectedTier: string; 
  onSelect: (tier: Tier) => void; 
  onNext: () => void; 
  formatCurrency: (amount: number) => string;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Paket Keanggotaan</h2>
        <p className="text-gray-600">7 Level Pimpinan dari Desa hingga Nasional</p>
        <p className="text-sm text-[#8B0000] font-medium mt-2">
          🎉 Diskon 95% khusus Maret 2026 - Jangan sampai terlewat!
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div className="text-sm text-red-700">
            <p className="font-medium mb-1">Informasi Penting:</p>
            <ul className="list-disc list-inside space-y-1 text-red-600">
              <li>Tier KORDES, KORCAM, KORDA, KORWIL memerlukan pemilihan lokasi wilayah</li>
              <li>PETANI, ANGGOTA BIASA, dan KORNAS tidak memerlukan pemilihan lokasi</li>
              <li>Petani GRATIS dengan syarat upload KTP dan foto kebun</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tiers.map((tier, index) => (
          <motion.div 
            key={tier.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTier === tier.id ? 'ring-2 ring-[#008F3D] shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => onSelect(tier)}
            >
              {/* Top accent bar dengan warna tier */}
              <div 
                className={`h-1.5 bg-gradient-to-r ${tierColors[tier.level].gradient}`}
              />
              
              <div 
                className="p-4 text-center relative"
                style={{ backgroundColor: tierColors[tier.level].soft }}
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${tierColors[tier.level].main}20` }}
                >
                  <span style={{ color: tierColors[tier.level].main }}>
                    {tierIcons[tier.level]}
                  </span>
                </div>
                {tier.level === 7 && (
                  <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs discount-badge">
                    <Star className="w-3 h-3 mr-1" /> TOP
                  </Badge>
                )}
                {tier.is_free && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                    <Leaf className="w-3 h-3 mr-1" /> GRATIS
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="text-center mb-3">
                  <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: tierColors[tier.level].main }}
                  >
                    {tier.title}
                  </p>
                </div>
                
                <CardDescription className="text-sm mb-3 text-center">{tier.description}</CardDescription>
                
                {/* Pricing */}
                <div className="text-center py-3 bg-gray-50 rounded-lg mb-3">
                  {tier.is_free ? (
                    <div className="text-2xl font-bold text-[#008F3D]">GRATIS</div>
                  ) : (
                    <>
                      {/* Promo Price */}
                      <div className="text-2xl font-bold text-[#008F3D]">
                        {formatCurrency(tier.promoPrice)}
                      </div>
                      {/* Early Bird Price */}
                      <div className="text-sm text-gray-500 line-through">
                        Early Bird: {formatCurrency(tier.earlyBirdPrice)}
                      </div>
                      {/* Normal Price */}
                      <div className="text-xs text-gray-400 line-through">
                        Normal: {formatCurrency(tier.normalPrice)}
                      </div>
                      <Badge className="bg-red-100 text-red-700 text-xs mt-1">
                        <Percent className="w-3 h-3 mr-1" /> Hemat {tier.discountPercent}%!
                      </Badge>
                    </>
                  )}
                  <div className="text-xs text-gray-500 mt-1">/ tahun</div>
                </div>
                
                {/* Benefits */}
                <div className="space-y-1 mb-3">
                  {tier.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                  {tier.benefits.length > 3 && (
                    <p className="text-xs text-gray-400">+{tier.benefits.length - 3} benefit lainnya</p>
                  )}
                </div>
                
                {/* Special Requirement for Petani */}
                {tier.special_requirement && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded mb-3">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    {tier.special_requirement}
                  </div>
                )}
                
                {tier.requires_location && (
                  <Badge variant="outline" className="w-full justify-center text-xs">
                    <MapPin className="w-3 h-3 mr-1" /> Pilih Lokasi
                  </Badge>
                )}
                
                {selectedTier === tier.id && (
                  <div className="absolute top-2 left-2 w-6 h-6 bg-[#008F3D] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={onNext} disabled={!selectedTier} className="bg-[#008F3D] hover:bg-[#00702E] px-8">
          Lanjutkan <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Personal Info Form Component
function PersonalInfoForm({ 
  data, 
  tierId, 
  tier,
  onUpdate, 
  onNext, 
  onBack 
}: { 
  data: RegistrationData; 
  tierId: string; 
  tier?: Tier;
  onUpdate: (data: Partial<RegistrationData>) => void; 
  onNext: () => void; 
  onBack: () => void;
}) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [farmPhotoPreview, setFarmPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isPetani = tierId === '1';
  const isPengurus = parseInt(tierId) >= 6;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'ktp' | 'farm') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'photo') {
          setPhotoPreview(e.target?.result as string);
          onUpdate({ photo: file });
        } else if (type === 'ktp') {
          setKtpPreview(e.target?.result as string);
          onUpdate({ ktp_photo: file });
        } else {
          setFarmPhotoPreview(e.target?.result as string);
          onUpdate({ farm_photo: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name || data.name.length < 3) newErrors.name = 'Nama minimal 3 karakter';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Email tidak valid';
    if (!data.phone || !/^08[0-9]{8,12}$/.test(data.phone)) newErrors.phone = 'Format HP tidak valid';
    if (!data.password || data.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (data.password !== data.password_confirmation) newErrors.password_confirmation = 'Password tidak cocok';

    if (!isPengurus) {
      if (!data.nik || data.nik.length !== 16) newErrors.nik = 'NIK harus 16 digit';
      if (!data.tempat_lahir) newErrors.tempat_lahir = 'Tempat lahir wajib diisi';
      if (!data.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
      if (!data.jenis_kelamin) newErrors.jenis_kelamin = 'Pilih jenis kelamin';
      if (!data.alamat || data.alamat.length < 10) newErrors.alamat = 'Alamat minimal 10 karakter';
    }
    
    if (isPengurus) {
      if (!data.company_name) newErrors.company_name = 'Nama perusahaan/organisasi wajib diisi';
      if (!data.business_type) newErrors.business_type = 'Jenis usaha/bidang wajib diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPengurus ? 'Data Organisasi/Usaha' : 'Data Pribadi'}
        </h2>
        <p className="text-gray-600">
          {isPengurus 
            ? 'Lengkapi informasi organisasi/usaha Anda' 
            : 'Lengkapi data pribadi sesuai KTP'
          }
        </p>
        {tier && (
          <Badge 
            className="mt-2"
            style={{ backgroundColor: tierColors[tier.level].soft, color: tierColors[tier.level].main }}
          >
            {tier.name} - {tier.title}
          </Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5" /> Informasi Akun
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap *</Label>
            <Input 
              id="name" 
              value={data.name} 
              onChange={(e) => onUpdate({ name: e.target.value })} 
              placeholder="Sesuai KTP/NPWP" 
              className={errors.name ? 'border-red-500' : ''} 
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              value={data.email} 
              onChange={(e) => onUpdate({ email: e.target.value })} 
              placeholder="email@contoh.com" 
              className={errors.email ? 'border-red-500' : ''} 
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor HP/WhatsApp *</Label>
            <Input 
              id="phone" 
              value={data.phone} 
              onChange={(e) => onUpdate({ phone: e.target.value })} 
              placeholder="081234567890" 
              className={errors.phone ? 'border-red-500' : ''} 
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input 
              id="password" 
              type="password" 
              value={data.password} 
              onChange={(e) => onUpdate({ password: e.target.value })} 
              placeholder="Minimal 8 karakter" 
              className={errors.password ? 'border-red-500' : ''} 
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Konfirmasi Password *</Label>
            <Input 
              id="password_confirmation" 
              type="password" 
              value={data.password_confirmation} 
              onChange={(e) => onUpdate({ password_confirmation: e.target.value })} 
              placeholder="Ulangi password" 
              className={errors.password_confirmation ? 'border-red-500' : ''} 
            />
            {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
          </div>
        </CardContent>
      </Card>

      {!isPengurus && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Data KTP</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nik">NIK *</Label>
              <Input 
                id="nik" 
                value={data.nik} 
                onChange={(e) => onUpdate({ nik: e.target.value })} 
                placeholder="16 digit NIK" 
                maxLength={16} 
                className={errors.nik ? 'border-red-500' : ''} 
              />
              {errors.nik && <p className="text-xs text-red-500">{errors.nik}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
              <Input 
                id="tempat_lahir" 
                value={data.tempat_lahir} 
                onChange={(e) => onUpdate({ tempat_lahir: e.target.value })} 
                placeholder="Kota kelahiran" 
                className={errors.tempat_lahir ? 'border-red-500' : ''} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
              <Input 
                id="tanggal_lahir" 
                type="date" 
                value={data.tanggal_lahir} 
                onChange={(e) => onUpdate({ tanggal_lahir: e.target.value })} 
                className={errors.tanggal_lahir ? 'border-red-500' : ''} 
              />
            </div>
            <div className="space-y-2">
              <Label>Jenis Kelamin *</Label>
              <RadioGroup 
                value={data.jenis_kelamin} 
                onValueChange={(value) => onUpdate({ jenis_kelamin: value as 'L' | 'P' })} 
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="L" id="laki" />
                  <Label htmlFor="laki">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="P" id="perempuan" />
                  <Label htmlFor="perempuan">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pekerjaan">Pekerjaan</Label>
              <Input 
                id="pekerjaan" 
                value={data.pekerjaan} 
                onChange={(e) => onUpdate({ pekerjaan: e.target.value })} 
                placeholder="Pekerjaan saat ini" 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="alamat">Alamat Lengkap *</Label>
              <Textarea 
                id="alamat" 
                value={data.alamat} 
                onChange={(e) => onUpdate({ alamat: e.target.value })} 
                placeholder="Alamat lengkap sesuai KTP" 
                rows={3} 
                className={errors.alamat ? 'border-red-500' : ''} 
              />
              {errors.alamat && <p className="text-xs text-red-500">{errors.alamat}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {isPengurus && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="w-5 h-5" /> Data Perusahaan
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Nama Perusahaan *</Label>
              <Input 
                id="company_name" 
                value={data.company_name} 
                onChange={(e) => onUpdate({ company_name: e.target.value })} 
                placeholder="Nama usaha Anda" 
                className={errors.company_name ? 'border-red-500' : ''} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_type">Jenis Usaha *</Label>
              <Input 
                id="business_type" 
                value={data.business_type} 
                onChange={(e) => onUpdate({ business_type: e.target.value })} 
                placeholder="Contoh: Retail, Kuliner" 
                className={errors.business_type ? 'border-red-500' : ''} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investment_value">Nilai Investasi *</Label>
              <Input 
                id="investment_value" 
                type="number" 
                value={data.investment_value} 
                onChange={(e) => onUpdate({ investment_value: Number(e.target.value) })} 
                placeholder="Minimal Rp 500.000" 
                className={errors.investment_value ? 'border-red-500' : ''} 
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Documents */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Upload Dokumen</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Foto 3x4 */}
          <div className="space-y-2">
            <Label>Foto 3x4 *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {photoPreview ? (
                <div className="relative">
                  <img src={photoPreview} alt="Preview" className="w-24 h-32 object-cover mx-auto rounded" />
                  <button 
                    type="button" 
                    onClick={() => { setPhotoPreview(null); onUpdate({ photo: null }); }} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer py-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Klik untuk upload</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handlePhotoChange(e, 'photo')} 
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Foto KTP */}
          <div className="space-y-2">
            <Label>Foto KTP *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {ktpPreview ? (
                <div className="relative">
                  <img src={ktpPreview} alt="Preview KTP" className="w-full max-w-xs mx-auto rounded" />
                  <button 
                    type="button" 
                    onClick={() => { setKtpPreview(null); onUpdate({ ktp_photo: null }); }} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer py-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Klik untuk upload</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handlePhotoChange(e, 'ktp')} 
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Foto Kebun - Khusus Petani */}
          {isPetani && (
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500" />
                Foto Kebun/Pertanian *
              </Label>
              <div className="border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
                {farmPhotoPreview ? (
                  <div className="relative">
                    <img src={farmPhotoPreview} alt="Preview Kebun" className="w-full max-w-md mx-auto rounded" />
                    <button 
                      type="button" 
                      onClick={() => { setFarmPhotoPreview(null); onUpdate({ farm_photo: null }); }} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer py-8">
                    <Leaf className="w-12 h-12 text-green-400 mb-2" />
                    <span className="text-sm text-green-600 font-medium">Upload foto kebun/pertanian Anda</span>
                    <span className="text-xs text-green-500 mt-1">Wajib untuk verifikasi status petani</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handlePhotoChange(e, 'farm')} 
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={handleSubmit} className="bg-[#008F3D] hover:bg-[#00702E] px-8">
          Lanjutkan <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Location Selector Component
function LocationSelector({ 
  data, 
  tierId, 
  provinces, 
  onUpdate, 
  onNext, 
  onBack 
}: { 
  data: RegistrationData; 
  tierId: string; 
  provinces: Location[]; 
  onUpdate: (data: Partial<RegistrationData>) => void; 
  onNext: () => void; 
  onBack: () => void;
}) {
  const tierLevel = parseInt(tierId);
  const canProceed = !!data.province_id;

  const getTierLabel = () => {
    switch (tierLevel) {
      case 3: return 'KORDES (Panglima Desa)';
      case 4: return 'KORCAM (Panglima Camat)';
      case 5: return 'KORDA (Panglima Distrik)';
      case 6: return 'KORWIL (Panglima Wilayah)';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Wilayah {getTierLabel()}</h2>
        <p className="text-gray-600">Pilih lokasi yang masih tersedia untuk posisi Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Pilih Lokasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Provinsi</Label>
            <Select 
              value={data.province_id} 
              onValueChange={(value) => { 
                const province = provinces.find(p => p.id === value); 
                onUpdate({ province_id: value, province_name: province?.name || '' }); 
              }}
            >
              <SelectTrigger><SelectValue placeholder="Pilih Provinsi" /></SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {data.province_id && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Lokasi Dipilih:</p>
              <p className="text-green-700">{data.province_name}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={onNext} disabled={!canProceed} className="bg-[#008F3D] hover:bg-[#00702E] px-8">
          Lanjutkan <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Payment Section Component
function PaymentSection({ 
  data, 
  paymentMethods, 
  onUpdate, 
  onSuccess, 
  onBack, 
  formatCurrency 
}: { 
  data: RegistrationData; 
  paymentMethods: { id: string; name: string; icon: React.ReactNode; fee: number }[]; 
  onUpdate: (data: Partial<RegistrationData>) => void; 
  onSuccess: () => void; 
  onBack: () => void; 
  formatCurrency: (amount: number) => string;
}) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
  const totalAmount = data.tier_price + (selectedPaymentMethod?.fee || 0);

  const handleSubmit = async () => {
    if (!selectedMethod) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran</h2>
        <p className="text-gray-600">Pilih metode pembayaran dan selesaikan pendaftaran</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Ringkasan Pemesanan</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{data.tier_name}</p>
                <p className="text-sm text-gray-500">Paket Keanggotaan</p>
              </div>
              <p className="font-medium">{formatCurrency(data.tier_price)}</p>
            </div>
            {data.province_name && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Lokasi:</span>
                <span>{data.province_name}</span>
              </div>
            )}
            <Separator />
            {selectedPaymentMethod && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Biaya Admin</span>
                <span>{formatCurrency(selectedPaymentMethod.fee)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-[#008F3D]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Metode Pembayaran</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.id 
                  ? 'border-[#008F3D] bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedMethod === method.id} 
                  onChange={() => setSelectedMethod(method.id)} 
                  className="text-[#008F3D]" 
                />
                <div className="text-gray-600">{method.icon}</div>
                <span className="font-medium">{method.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {method.fee > 0 ? formatCurrency(method.fee) : 'Gratis'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6" disabled={loading}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedMethod || loading} 
          className="bg-[#008F3D] hover:bg-[#00702E] px-8"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memproses...</>
          ) : (
            <><CheckCircle2 className="w-4 h-4 mr-2" /> Bayar Sekarang</>
          )}
        </Button>
      </div>
    </div>
  );
}

// Registration Success Component
function RegistrationSuccess({ 
  data, 
  formatCurrency 
}: { 
  data: RegistrationData; 
  formatCurrency: (amount: number) => string;
}) {
  const getTierLabel = (tierId: string) => {
    const tiers: Record<string, { name: string; title: string }> = { 
      '1': { name: 'PETANI', title: 'Petani Koperasi' }, 
      '2': { name: 'ANGGOTA BIASA', title: 'Anggota Koperasi' }, 
      '3': { name: 'KORDES', title: 'Panglima Desa' }, 
      '4': { name: 'KORCAM', title: 'Panglima Camat' }, 
      '5': { name: 'KORDA', title: 'Panglima Distrik' }, 
      '6': { name: 'KORWIL', title: 'Panglima Wilayah' }, 
      '7': { name: 'KORNAS', title: 'Panglima Besar' }
    };
    return tiers[tierId] || { name: 'Anggota', title: '' };
  };

  const tierInfo = getTierLabel(data.tier_id);
  const isFree = data.tier_price === 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} 
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
        <p className="text-gray-600">
          Selamat! Anda terdaftar sebagai <strong>{tierInfo.name}</strong> ({tierInfo.title}) KNMP
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-lg">Detail Pendaftaran</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Nama</span>
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">No. HP</span>
              <span className="font-medium">{data.phone}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Paket</span>
              <Badge className="bg-[#008F3D]">{tierInfo.name} - {tierInfo.title}</Badge>
            </div>
            {data.province_name && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Lokasi</span>
                <span className="font-medium">{data.province_name}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Total Pembayaran</span>
              <span className="font-bold text-[#008F3D] text-lg">
                {isFree ? 'GRATIS' : formatCurrency(data.tier_price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-800">Menunggu Verifikasi</p>
              <p className="text-sm text-yellow-700 mt-1">
                Pendaftaran Anda sedang dalam proses verifikasi. Kami akan menghubungi Anda melalui email dalam 1x24 jam.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-blue-500" />
            <div>
              <p className="font-medium text-blue-800">Cek Email Anda</p>
              <p className="text-sm text-blue-700 mt-1">
                Kami telah mengirimkan konfirmasi ke <span className="font-medium">{data.email}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="px-6">
          <Download className="w-4 h-4 mr-2" /> Download Bukti
        </Button>
        <Link href="/">
          <Button className="bg-[#008F3D] hover:bg-[#00702E] px-6 w-full">
            Kembali ke Beranda <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Ada pertanyaan? Hubungi kami:</p>
        <p className="font-medium text-gray-700 mt-1">WhatsApp: 0812-3456-7890 | Email: info@knmp.or.id</p>
      </div>
    </div>
  );
}
