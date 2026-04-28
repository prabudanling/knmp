# 🚀 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Sistem Pendaftaran Pengurus 7 Tier - Part 3: Frontend Integration

---

## 📋 DAFTAR ISI PART 3

1. [Setup API Client](#1-setup-api-client)
2. [Form Pendaftaran Multi-Step](#2-form-pendaftaran-multi-step)
3. [Pilih Paket/Tier](#3-pilih-pakettier)
4. [Form Data Diri](#4-form-data-diri)
5. [Pilih Lokasi](#5-pilih-lokasi)
6. [Halaman Pembayaran](#6-halaman-pembayaran)
7. [Status Pendaftaran](#7-status-pendaftaran)

---

## 1. SETUP API CLIENT

### 📄 lib/api.ts

```typescript
// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, token } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    },
  };

  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API Error');
  }

  return response.json();
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string; phone: string }) =>
    api('/register', { method: 'POST', body: data }),
  
  login: (data: { email: string; password: string }) =>
    api('/login', { method: 'POST', body: data }),
  
  logout: (token: string) =>
    api('/logout', { method: 'POST', token }),
  
  me: (token: string) =>
    api('/me', { token }),
  
  updateProfile: (token: string, data: { name?: string; phone?: string }) =>
    api('/profile', { method: 'PUT', body: data, token }),
};

// Tier API
export const tierApi = {
  getAll: () => api('/tiers'),
};

// Location API
export const locationApi = {
  getProvinces: () => api('/provinces'),
  getRegencies: (provinceId: string) => api(`/regencies?province_id=${provinceId}`),
  getDistricts: (regencyId: string) => api(`/districts?regency_id=${regencyId}`),
  getVillages: (districtId: string) => api(`/villages?district_id=${districtId}`),
};

// Registration API
export const registrationApi = {
  getAvailablePositions: (params: { tier_id: string; province_id?: string; regency_id?: string; district_id?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return api(`/positions/available?${query}`);
  },
  
  submit: (token: string, formData: FormData) => {
    return fetch(`${API_BASE_URL}/registration/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  },
  
  getMyRegistrations: (token: string) =>
    api('/registration/my', { token }),
  
  getStatus: (token: string, id: string) =>
    api(`/registration/${id}`, { token }),
};

// Payment API
export const paymentApi = {
  checkStatus: (orderId: string) =>
    api(`/payment/status/${orderId}`),
};
```

### 📄 hooks/useAuth.ts

```typescript
// src/hooks/useAuth.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  member?: {
    id: number;
    tier_id: number;
    position: string;
    status: string;
  };
  mitra?: {
    id: number;
    company_name: string;
    category: string;
    status: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'knmp-auth',
    }
  )
);
```

---

## 2. FORM PENDAFTARAN MULTI-STEP

### 📄 Halaman Pendaftaran Utama

```typescript
// src/app/daftar/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { TierSelection } from '@/components/registration/TierSelection';
import { PersonalInfoForm } from '@/components/registration/PersonalInfoForm';
import { LocationSelector } from '@/components/registration/LocationSelector';
import { PaymentSection } from '@/components/registration/PaymentSection';
import { RegistrationSuccess } from '@/components/registration/RegistrationSuccess';
import { ProgressIndicator } from '@/components/registration/ProgressIndicator';

export interface RegistrationData {
  // Tier
  tier_id: string;
  tier_name: string;
  tier_price: number;
  
  // User
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  
  // Personal (Member)
  nik?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'L' | 'P';
  alamat?: string;
  pekerjaan?: string;
  photo?: File;
  ktp_photo?: File;
  
  // Location (for Tier 2-5)
  province_id?: string;
  province_name?: string;
  regency_id?: string;
  regency_name?: string;
  district_id?: string;
  district_name?: string;
  village_id?: string;
  village_name?: string;
  
  // Mitra (Tier 7)
  company_name?: string;
  business_type?: string;
  npwp?: string;
  siup?: string;
  nib?: string;
  contact_person?: string;
  website?: string;
  investment_value?: number;
  
  // Payment
  payment_method?: string;
}

const STEPS = [
  { id: 1, name: 'Pilih Paket', description: 'Pilih tier keanggotaan' },
  { id: 2, name: 'Data Diri', description: 'Isi informasi personal' },
  { id: 3, name: 'Lokasi', description: 'Pilih wilayah (jika diperlukan)' },
  { id: 4, name: 'Pembayaran', description: 'Pilih metode pembayaran' },
  { id: 5, name: 'Selesai', description: 'Pendaftaran berhasil' },
];

export default function RegistrationPage() {
  const router = useRouter();
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
  });

  const updateData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    // Skip location step if tier doesn't require it
    if (currentStep === 2) {
      const tierLevel = parseInt(registrationData.tier_id);
      if (tierLevel === 6 || tierLevel === 7) {
        // Anggota Biasa or Mitra - skip location
        setCurrentStep(4);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    if (currentStep === 4) {
      const tierLevel = parseInt(registrationData.tier_id);
      if (tierLevel === 6 || tierLevel === 7) {
        setCurrentStep(2);
        return;
      }
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSuccess = (orderId: string) => {
    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#008F3D] to-[#006B2D] text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Pendaftaran Anggota KNMP</h1>
          <p className="text-green-100">
            Bergabunglah dengan Koperasi Nusantara Merah Putih
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ProgressIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="tier"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TierSelection
                selectedTier={registrationData.tier_id}
                onSelect={(tier) => {
                  updateData({
                    tier_id: tier.id,
                    tier_name: tier.name,
                    tier_price: tier.price,
                  });
                }}
                onNext={nextStep}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PersonalInfoForm
                data={registrationData}
                tierId={registrationData.tier_id}
                onUpdate={updateData}
                onNext={nextStep}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LocationSelector
                data={registrationData}
                tierId={registrationData.tier_id}
                onUpdate={updateData}
                onNext={nextStep}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PaymentSection
                data={registrationData}
                onUpdate={updateData}
                onSuccess={handleSuccess}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <RegistrationSuccess data={registrationData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## 3. PILIH PAKET/TIER

### 📄 TierSelection Component

```typescript
// src/components/registration/TierSelection.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, MapPin, Building, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Tier {
  id: number;
  name: string;
  level: number;
  price: number;
  description: string;
  benefits: string[];
  is_active: boolean;
  requires_location: boolean;
}

interface TierSelectionProps {
  selectedTier: string;
  onSelect: (tier: Tier) => void;
  onNext: () => void;
}

const tierIcons: Record<number, React.ReactNode> = {
  2: <MapPin className="w-8 h-8" />,
  3: <Building className="w-8 h-8" />,
  4: <Users className="w-8 h-8" />,
  5: <Users className="w-8 h-8" />,
  6: <Users className="w-8 h-8" />,
  7: <Crown className="w-8 h-8" />,
};

const tierColors: Record<number, string> = {
  2: 'from-purple-500 to-purple-700',
  3: 'from-blue-500 to-blue-700',
  4: 'from-cyan-500 to-cyan-700',
  5: 'from-green-500 to-green-700',
  6: 'from-gray-500 to-gray-700',
  7: 'from-yellow-500 to-amber-600',
};

export function TierSelection({ selectedTier, onSelect, onNext }: TierSelectionProps) {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tiers`);
      const result = await response.json();
      if (result.success) {
        // Filter only registration-eligible tiers (2-7)
        const registrationTiers = result.data.filter((t: Tier) => t.level >= 2 && t.level <= 7);
        setTiers(registrationTiers);
      }
    } catch (error) {
      console.error('Failed to fetch tiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-24 bg-gray-200 animate-pulse" />
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Paket Keanggotaan</h2>
        <p className="text-gray-600">
          Pilih tier sesuai dengan kebutuhan dan lokasi yang tersedia
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Informasi Penting:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Tier 2-5 memerlukan pemilihan lokasi yang masih kosong</li>
              <li>Tier 6 (Anggota Biasa) tidak memerlukan pemilihan lokasi</li>
              <li>Tier 7 (Mitra) adalah mitra bisnis, bukan pengurus</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedTier === String(tier.id)
                  ? 'ring-2 ring-[#008F3D] shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelect(tier)}
            >
              {/* Header Gradient */}
              <div className={`h-20 bg-gradient-to-r ${tierColors[tier.level]} relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  {tierIcons[tier.level]}
                </div>
                {tier.level === 7 && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      POPULER
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{tier.name}</span>
                  {selectedTier === String(tier.id) && (
                    <div className="w-6 h-6 bg-[#008F3D] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#008F3D]">
                    {formatPrice(tier.price)}
                  </div>
                  <div className="text-sm text-gray-500">/ tahun</div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  {tier.benefits?.slice(0, 4).map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Requires Location Badge */}
                {tier.requires_location && (
                  <Badge variant="outline" className="w-full justify-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Pilih Lokasi Tersedia
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={onNext}
          disabled={!selectedTier}
          className="bg-[#008F3D] hover:bg-[#00702E] px-8"
        >
          Lanjutkan
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
```

---

## 4. FORM DATA DIRI

### 📄 PersonalInfoForm Component

```typescript
// src/components/registration/PersonalInfoForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, User, Building, ArrowLeft, ArrowRight } from 'lucide-react';
import { RegistrationData } from '@/app/daftar/page';

// Validation Schema for Member
const memberSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().regex(/^08[0-9]{8,12}$/, 'Format HP tidak valid (contoh: 081234567890)'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  password_confirmation: z.string(),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  tempat_lahir: z.string().min(2, 'Tempat lahir minimal 2 karakter'),
  tanggal_lahir: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date < new Date();
  }, 'Tanggal lahir tidak valid'),
  jenis_kelamin: z.enum(['L', 'P']),
  alamat: z.string().min(10, 'Alamat minimal 10 karakter'),
  pekerjaan: z.string().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Password tidak cocok',
  path: ['password_confirmation'],
});

// Validation Schema for Mitra
const mitraSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().regex(/^08[0-9]{8,12}$/, 'Format HP tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  password_confirmation: z.string(),
  company_name: z.string().min(3, 'Nama perusahaan minimal 3 karakter'),
  business_type: z.string().min(2, 'Jenis usaha minimal 2 karakter'),
  npwp: z.string().optional(),
  siup: z.string().optional(),
  nib: z.string().optional(),
  contact_person: z.string().min(3, 'Nama contact person minimal 3 karakter'),
  website: z.string().url('URL website tidak valid').optional().or(z.literal('')),
  investment_value: z.coerce.number().min(500000, 'Minimal investasi Rp 500.000'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Password tidak cocok',
  path: ['password_confirmation'],
});

interface PersonalInfoFormProps {
  data: RegistrationData;
  tierId: string;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoForm({ data, tierId, onUpdate, onNext, onBack }: PersonalInfoFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const isMitra = tierId === '7';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(isMitra ? mitraSchema : memberSchema),
    defaultValues: data,
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'ktp') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'photo') {
          setPhotoPreview(e.target?.result as string);
          onUpdate({ photo: file });
        } else {
          setKtpPreview(e.target?.result as string);
          onUpdate({ ktp_photo: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formData: Record<string, unknown>) => {
    onUpdate(formData as Partial<RegistrationData>);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isMitra ? 'Data Mitra Bisnis' : 'Data Pribadi'}
          </h2>
          <p className="text-gray-600">
            {isMitra
              ? 'Lengkapi informasi perusahaan/usaha Anda'
              : 'Lengkapi data pribadi sesuai KTP'}
          </p>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Informasi Akun
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Sesuai KTP/NPWP"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="email@contoh.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor HP/WhatsApp *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="081234567890"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Minimal 8 karakter"
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Konfirmasi Password *</Label>
              <Input
                id="password_confirmation"
                type="password"
                {...register('password_confirmation')}
                placeholder="Ulangi password"
                className={errors.password_confirmation ? 'border-red-500' : ''}
              />
              {errors.password_confirmation && (
                <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Member Specific Fields */}
        {!isMitra && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data KTP</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
                  <Input
                    id="nik"
                    {...register('nik')}
                    placeholder="16 digit NIK"
                    maxLength={16}
                    className={errors.nik ? 'border-red-500' : ''}
                  />
                  {errors.nik && (
                    <p className="text-sm text-red-500">{errors.nik.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
                  <Input
                    id="tempat_lahir"
                    {...register('tempat_lahir')}
                    placeholder="Kota kelahiran"
                    className={errors.tempat_lahir ? 'border-red-500' : ''}
                  />
                  {errors.tempat_lahir && (
                    <p className="text-sm text-red-500">{errors.tempat_lahir.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                  <Input
                    id="tanggal_lahir"
                    type="date"
                    {...register('tanggal_lahir')}
                    className={errors.tanggal_lahir ? 'border-red-500' : ''}
                  />
                  {errors.tanggal_lahir && (
                    <p className="text-sm text-red-500">{errors.tanggal_lahir.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Jenis Kelamin *</Label>
                  <RadioGroup
                    defaultValue={watch('jenis_kelamin')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="L" id="laki" {...register('jenis_kelamin')} />
                      <Label htmlFor="laki">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="P" id="perempuan" {...register('jenis_kelamin')} />
                      <Label htmlFor="perempuan">Perempuan</Label>
                    </div>
                  </RadioGroup>
                  {errors.jenis_kelamin && (
                    <p className="text-sm text-red-500">{errors.jenis_kelamin.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pekerjaan">Pekerjaan</Label>
                  <Input
                    id="pekerjaan"
                    {...register('pekerjaan')}
                    placeholder="Pekerjaan saat ini"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamat">Alamat Lengkap (Sesuai KTP) *</Label>
                  <Textarea
                    id="alamat"
                    {...register('alamat')}
                    placeholder="Alamat lengkap sesuai KTP"
                    rows={3}
                    className={errors.alamat ? 'border-red-500' : ''}
                  />
                  {errors.alamat && (
                    <p className="text-sm text-red-500">{errors.alamat.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Dokumen</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo */}
                <div className="space-y-2">
                  <Label>Foto 3x4 *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-32 h-40 object-cover mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null);
                            onUpdate({ photo: undefined });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center cursor-pointer py-8">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Klik untuk upload</span>
                        <span className="text-xs text-gray-400">JPG, PNG (max 2MB)</span>
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

                {/* KTP Photo */}
                <div className="space-y-2">
                  <Label>Foto KTP *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {ktpPreview ? (
                      <div className="relative">
                        <img
                          src={ktpPreview}
                          alt="Preview KTP"
                          className="w-full max-w-xs mx-auto rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setKtpPreview(null);
                            onUpdate({ ktp_photo: undefined });
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center cursor-pointer py-8">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Klik untuk upload</span>
                        <span className="text-xs text-gray-400">JPG, PNG (max 2MB)</span>
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
              </CardContent>
            </Card>
          </>
        )}

        {/* Mitra Specific Fields */}
        {isMitra && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="w-5 h-5" />
                Data Perusahaan/Usaha
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Nama Perusahaan/Usaha *</Label>
                <Input
                  id="company_name"
                  {...register('company_name')}
                  placeholder="Nama usaha Anda"
                  className={errors.company_name ? 'border-red-500' : ''}
                />
                {errors.company_name && (
                  <p className="text-sm text-red-500">{errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_type">Jenis Usaha *</Label>
                <Input
                  id="business_type"
                  {...register('business_type')}
                  placeholder="Contoh: Retail, Kuliner, Jasa"
                  className={errors.business_type ? 'border-red-500' : ''}
                />
                {errors.business_type && (
                  <p className="text-sm text-red-500">{errors.business_type.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="npwp">NPWP Perusahaan</Label>
                <Input
                  id="npwp"
                  {...register('npwp')}
                  placeholder="16 digit NPWP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siup">SIUP</Label>
                <Input
                  id="siup"
                  {...register('siup')}
                  placeholder="Nomor SIUP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nib">NIB</Label>
                <Input
                  id="nib"
                  {...register('nib')}
                  placeholder="Nomor Induk Berusaha"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_person">Contact Person *</Label>
                <Input
                  id="contact_person"
                  {...register('contact_person')}
                  placeholder="Nama PIC"
                  className={errors.contact_person ? 'border-red-500' : ''}
                />
                {errors.contact_person && (
                  <p className="text-sm text-red-500">{errors.contact_person.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  {...register('website')}
                  placeholder="https://website.com"
                  className={errors.website ? 'border-red-500' : ''}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="investment_value">Nilai Investasi/Kemitraan *</Label>
                <Input
                  id="investment_value"
                  type="number"
                  {...register('investment_value', { valueAsNumber: true })}
                  placeholder="Minimal Rp 500.000"
                  className={errors.investment_value ? 'border-red-500' : ''}
                />
                {errors.investment_value && (
                  <p className="text-sm text-red-500">{errors.investment_value.message}</p>
                )}
                <p className="text-xs text-gray-500">
                  Kategori Mitra: Bronze (Rp 500rb+), Silver (Rp 1jt+), Gold (Rp 2.5jt+), Platinum (Rp 5jt+)
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Button
            type="submit"
            className="bg-[#008F3D] hover:bg-[#00702E] px-8"
          >
            Lanjutkan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </form>
  );
}
```

---

## 5. PILIH LOKASI

### 📄 LocationSelector Component

```typescript
// src/components/registration/LocationSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { RegistrationData } from '@/app/daftar/page';

interface Location {
  id: string;
  name: string;
  code: string;
}

interface Position {
  id: string;
  position_name: string;
  position_code: string;
  province?: { name: string };
  regency?: { name: string };
  district?: { name: string };
  village?: { name: string };
  status: string;
}

interface LocationSelectorProps {
  data: RegistrationData;
  tierId: string;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationSelector({ data, tierId, onUpdate, onNext, onBack }: LocationSelectorProps) {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [regencies, setRegencies] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [villages, setVillages] = useState<Location[]>([]);
  
  const [availablePositions, setAvailablePositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);
  const [loadingPositions, setLoadingPositions] = useState(false);

  const tierLevel = parseInt(tierId);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/provinces`);
      const result = await response.json();
      setProvinces(result.data || []);
    } catch (error) {
      console.error('Failed to fetch provinces:', error);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const fetchRegencies = async (provinceId: string) => {
    setLoadingRegencies(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/regencies?province_id=${provinceId}`
      );
      const result = await response.json();
      setRegencies(result.data || []);
    } catch (error) {
      console.error('Failed to fetch regencies:', error);
    } finally {
      setLoadingRegencies(false);
    }
  };

  const fetchDistricts = async (regencyId: string) => {
    setLoadingDistricts(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/districts?regency_id=${regencyId}`
      );
      const result = await response.json();
      setDistricts(result.data || []);
    } catch (error) {
      console.error('Failed to fetch districts:', error);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const fetchVillages = async (districtId: string) => {
    setLoadingVillages(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/villages?district_id=${districtId}`
      );
      const result = await response.json();
      setVillages(result.data || []);
    } catch (error) {
      console.error('Failed to fetch villages:', error);
    } finally {
      setLoadingVillages(false);
    }
  };

  const fetchAvailablePositions = async () => {
    setLoadingPositions(true);
    try {
      const params = new URLSearchParams({ tier_id: tierId });
      if (data.province_id) params.append('province_id', data.province_id);
      if (data.regency_id) params.append('regency_id', data.regency_id);
      if (data.district_id) params.append('district_id', data.district_id);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/positions/available?${params}`
      );
      const result = await response.json();
      setAvailablePositions(result.data || []);
    } catch (error) {
      console.error('Failed to fetch positions:', error);
    } finally {
      setLoadingPositions(false);
    }
  };

  // Fetch positions when location changes
  useEffect(() => {
    const canFetch = () => {
      switch (tierLevel) {
        case 2: return !!data.province_id;
        case 3: return !!data.province_id && !!data.regency_id;
        case 4: return !!data.province_id && !!data.regency_id && !!data.district_id;
        case 5: return !!data.province_id && !!data.regency_id && !!data.district_id && !!data.village_id;
        default: return false;
      }
    };

    if (canFetch()) {
      fetchAvailablePositions();
    }
  }, [data.province_id, data.regency_id, data.district_id, data.village_id]);

  const handleProvinceChange = (value: string) => {
    const province = provinces.find(p => String(p.id) === value);
    onUpdate({
      province_id: value,
      province_name: province?.name || '',
      regency_id: undefined,
      regency_name: undefined,
      district_id: undefined,
      district_name: undefined,
      village_id: undefined,
      village_name: undefined,
    });
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    setAvailablePositions([]);
    setSelectedPosition(null);
    if (value) fetchRegencies(value);
  };

  const handleRegencyChange = (value: string) => {
    const regency = regencies.find(r => String(r.id) === value);
    onUpdate({
      regency_id: value,
      regency_name: regency?.name || '',
      district_id: undefined,
      district_name: undefined,
      village_id: undefined,
      village_name: undefined,
    });
    setDistricts([]);
    setVillages([]);
    setAvailablePositions([]);
    setSelectedPosition(null);
    if (value) fetchDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    const district = districts.find(d => String(d.id) === value);
    onUpdate({
      district_id: value,
      district_name: district?.name || '',
      village_id: undefined,
      village_name: undefined,
    });
    setVillages([]);
    setAvailablePositions([]);
    setSelectedPosition(null);
    if (value) fetchVillages(value);
  };

  const handleVillageChange = (value: string) => {
    const village = villages.find(v => String(v.id) === value);
    onUpdate({
      village_id: value,
      village_name: village?.name || '',
    });
    setAvailablePositions([]);
    setSelectedPosition(null);
  };

  const handleSelectPosition = (position: Position) => {
    setSelectedPosition(position);
  };

  const canProceed = () => {
    if (selectedPosition) return true;
    
    switch (tierLevel) {
      case 2: return !!data.province_id;
      case 3: return !!data.province_id && !!data.regency_id;
      case 4: return !!data.province_id && !!data.regency_id && !!data.district_id;
      case 5: return !!data.province_id && !!data.regency_id && !!data.district_id && !!data.village_id;
      default: return false;
    }
  };

  const getTierLabel = () => {
    switch (tierLevel) {
      case 2: return 'KORWIL (Provinsi)';
      case 3: return 'KORDA (Kabupaten/Kota)';
      case 4: return 'KORCAM (Kecamatan)';
      case 5: return 'KORDES (Desa)';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pilih Wilayah {getTierLabel()}
        </h2>
        <p className="text-gray-600">
          Pilih lokasi yang masih tersedia untuk posisi Anda
        </p>
      </div>

      {/* Location Selectors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Pilih Lokasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Province */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Provinsi</label>
              {loadingProvinces ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={data.province_id}
                  onValueChange={handleProvinceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.id} value={String(province.id)}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Regency (for Tier 3-5) */}
            {tierLevel >= 3 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Kabupaten/Kota</label>
                {loadingRegencies ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={data.regency_id}
                    onValueChange={handleRegencyChange}
                    disabled={!data.province_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kabupaten/Kota" />
                    </SelectTrigger>
                    <SelectContent>
                      {regencies.map((regency) => (
                        <SelectItem key={regency.id} value={String(regency.id)}>
                          {regency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {/* District (for Tier 4-5) */}
            {tierLevel >= 4 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Kecamatan</label>
                {loadingDistricts ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={data.district_id}
                    onValueChange={handleDistrictChange}
                    disabled={!data.regency_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={String(district.id)}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}

            {/* Village (for Tier 5) */}
            {tierLevel >= 5 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Desa/Kelurahan</label>
                {loadingVillages ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={data.village_id}
                    onValueChange={handleVillageChange}
                    disabled={!data.district_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Desa" />
                    </SelectTrigger>
                    <SelectContent>
                      {villages.map((village) => (
                        <SelectItem key={village.id} value={String(village.id)}>
                          {village.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          </div>

          {/* Selected Location Summary */}
          {data.province_id && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Lokasi Dipilih:</p>
              <p className="text-green-700">
                {[data.village_name, data.district_name, data.regency_name, data.province_name]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Positions */}
      {loadingPositions ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : availablePositions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Posisi Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePositions.map((position) => (
                <motion.div
                  key={position.id}
                  whileHover={{ scale: 1.02 }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPosition?.id === position.id
                      ? 'border-[#008F3D] bg-green-50 ring-2 ring-[#008F3D]'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleSelectPosition(position)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{position.position_name}</span>
                    {selectedPosition?.id === position.id && (
                      <div className="w-6 h-6 bg-[#008F3D] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {position.village?.name && `${position.village.name}, `}
                    {position.district?.name && `${position.district.name}, `}
                    {position.regency?.name && `${position.regency.name}, `}
                    {position.province?.name}
                  </p>
                  <Badge variant="outline" className="mt-2 text-green-600 border-green-300">
                    Tersedia
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : data.province_id && !loadingPositions ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">Tidak Ada Posisi Tersedia</p>
              <p className="text-gray-500">
                Posisi di lokasi ini sudah terisi. Silakan pilih lokasi lain.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed()}
          className="bg-[#008F3D] hover:bg-[#00702E] px-8"
        >
          Lanjutkan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
```

---

## ✅ CHECKLIST PART 3

- [x] Setup API Client (lib/api.ts)
- [x] useAuth Hook
- [x] Form Pendaftaran Multi-Step
- [x] TierSelection Component
- [x] PersonalInfoForm Component
- [x] LocationSelector Component

---

## 📖 LANJUT KE PART 4

Part 4 akan membahas:
- PaymentSection Component
- Midtrans Integration
- RegistrationSuccess Component
- ProgressIndicator Component
- Complete Flow Testing

---

*Dokumen ini adalah bagian dari Tutorial Backend Laravel KNMP*
*Total Parts: 5 Dokumen*
