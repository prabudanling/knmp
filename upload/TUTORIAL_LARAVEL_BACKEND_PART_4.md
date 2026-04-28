# 🚀 TUTORIAL LENGKAP BACKEND LARAVEL KNMP
## Sistem Pendaftaran Pengurus 7 Tier - Part 4: Payment & Final Components

---

## 📋 DAFTAR ISI PART 4

1. [PaymentSection Component](#1-paymentsection-component)
2. [Midtrans Snap Integration](#2-midtrans-snap-integration)
3. [RegistrationSuccess Component](#3-registrationsuccess-component)
4. [ProgressIndicator Component](#4-progressindicator-component)
5. [Additional Components](#5-additional-components)

---

## 1. PAYMENTSECTION COMPONENT

### 📄 PaymentSection Component

```typescript
// src/components/registration/PaymentSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Building2,
  Wallet,
  QrCode,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RegistrationData } from '@/app/daftar/page';

interface PaymentSectionProps {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fee: number;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'va_bca',
    name: 'BCA Virtual Account',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Transfer via ATM/Mobile Banking BCA',
    fee: 4000,
  },
  {
    id: 'va_mandiri',
    name: 'Mandiri Virtual Account',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Transfer via ATM/Mobile Banking Mandiri',
    fee: 4000,
  },
  {
    id: 'va_bni',
    name: 'BNI Virtual Account',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Transfer via ATM/Mobile Banking BNI',
    fee: 4000,
  },
  {
    id: 'va_bri',
    name: 'BRI Virtual Account',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Transfer via ATM/Mobile Banking BRI',
    fee: 4000,
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: <QrCode className="w-6 h-6" />,
    description: 'Scan dengan e-wallet atau mobile banking',
    fee: 700,
  },
  {
    id: 'gopay',
    name: 'GoPay',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Bayar dengan saldo GoPay',
    fee: 0,
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    icon: <Wallet className="w-6 h-6" />,
    description: 'Bayar dengan saldo ShopeePay',
    fee: 0,
  },
];

export function PaymentSection({ data, onUpdate, onSuccess, onBack }: PaymentSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [vaNumber, setVaNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
  const totalAmount = data.tier_price + (selectedPaymentMethod?.fee || 0);

  const handleSubmit = async () => {
    if (!selectedMethod) {
      setError('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare FormData
      const formData = new FormData();
      
      // User data
      formData.append('tier_id', data.tier_id);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('password', data.password);
      formData.append('password_confirmation', data.password_confirmation);
      
      // Member data (if applicable)
      if (data.nik) formData.append('nik', data.nik);
      if (data.tempat_lahir) formData.append('tempat_lahir', data.tempat_lahir);
      if (data.tanggal_lahir) formData.append('tanggal_lahir', data.tanggal_lahir);
      if (data.jenis_kelamin) formData.append('jenis_kelamin', data.jenis_kelamin);
      if (data.alamat) formData.append('alamat', data.alamat);
      if (data.pekerjaan) formData.append('pekerjaan', data.pekerjaan);
      if (data.photo) formData.append('photo', data.photo);
      if (data.ktp_photo) formData.append('ktp_photo', data.ktp_photo);
      
      // Location data (for Tier 2-5)
      if (data.province_id) formData.append('province_id', data.province_id);
      if (data.regency_id) formData.append('regency_id', data.regency_id);
      if (data.district_id) formData.append('district_id', data.district_id);
      if (data.village_id) formData.append('village_id', data.village_id);
      
      // Mitra data (if Tier 7)
      if (data.company_name) formData.append('company_name', data.company_name);
      if (data.business_type) formData.append('business_type', data.business_type);
      if (data.npwp) formData.append('npwp', data.npwp);
      if (data.siup) formData.append('siup', data.siup);
      if (data.nib) formData.append('nib', data.nib);
      if (data.contact_person) formData.append('contact_person', data.contact_person);
      if (data.website) formData.append('website', data.website);
      if (data.investment_value) formData.append('investment_value', String(data.investment_value));
      
      // Payment method
      formData.append('payment_method', selectedMethod);

      // Submit registration
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration/submit`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setOrderId(result.data.payment.order_id);
        
        if (result.data.payment_url) {
          // Redirect to Midtrans Snap or show payment URL
          setPaymentUrl(result.data.payment_url);
          
          // For VA, show the VA number
          if (result.data.va_number) {
            setVaNumber(result.data.va_number);
          }
          
          // Open Midtrans Snap in popup
          if (typeof window !== 'undefined' && (window as any).snap) {
            (window as any).snap.pay(result.data.payment_token, {
              onSuccess: function() {
                onSuccess(result.data.payment.order_id);
              },
              onPending: function() {
                // Show VA number or QRIS code
                onSuccess(result.data.payment.order_id);
              },
              onError: function() {
                setError('Pembayaran gagal. Silakan coba lagi.');
              },
              onClose: function() {
                // User closed the popup
              },
            });
          } else {
            // Fallback: redirect to payment URL
            window.open(result.data.payment_url, '_blank');
            onSuccess(result.data.payment.order_id);
          }
        }
      } else {
        setError(result.message || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran</h2>
        <p className="text-gray-600">
          Pilih metode pembayaran dan selesaikan pendaftaran Anda
        </p>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ringkasan Pemesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                <span>
                  {[data.village_name, data.district_name, data.regency_name, data.province_name]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            )}

            <Separator />

            {selectedPaymentMethod && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Biaya Admin ({selectedPaymentMethod.name})</span>
                <span>{formatCurrency(selectedPaymentMethod.fee)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Pembayaran</span>
              <span className="text-[#008F3D]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Metode Pembayaran
          </CardTitle>
          <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="space-y-3"
          >
            {/* Virtual Accounts */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 mb-2">Virtual Account</p>
              {paymentMethods
                .filter(m => m.id.startsWith('va_'))
                .map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#008F3D] bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="text-gray-600">{method.icon}</div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {method.fee > 0 ? formatCurrency(method.fee) : 'Gratis'}
                    </span>
                  </Label>
                ))}
            </div>

            {/* E-Wallet */}
            <div className="space-y-2 pt-4">
              <p className="text-sm font-medium text-gray-500 mb-2">E-Wallet</p>
              {paymentMethods
                .filter(m => !m.id.startsWith('va_') && m.id !== 'qris')
                .map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#008F3D] bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="text-gray-600">{method.icon}</div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {method.fee > 0 ? formatCurrency(method.fee) : 'Gratis'}
                    </span>
                  </Label>
                ))}
            </div>

            {/* QRIS */}
            <div className="space-y-2 pt-4">
              <p className="text-sm font-medium text-gray-500 mb-2">QRIS</p>
              {paymentMethods
                .filter(m => m.id === 'qris')
                .map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#008F3D] bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="text-gray-600">{method.icon}</div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {method.fee > 0 ? formatCurrency(method.fee) : 'Gratis'}
                    </span>
                  </Label>
                ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* VA Number Display (after payment initiated) */}
      {vaNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-medium text-gray-700 mb-2">Nomor Virtual Account</p>
                <p className="text-2xl font-bold text-[#008F3D] tracking-wider mb-4">
                  {vaNumber}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Transfer {formatCurrency(totalAmount)} ke nomor VA di atas
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>Batas waktu pembayaran: 24 jam</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="px-6" disabled={loading}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedMethod || loading}
          className="bg-[#008F3D] hover:bg-[#00702E] px-8"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              Bayar Sekarang
              <CheckCircle2 className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
```

---

## 2. MIDTRANS SNAP INTEGRATION

### 📄 Include Midtrans Snap JS

```typescript
// src/app/daftar/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pendaftaran Anggota - KNMP',
  description: 'Daftar sebagai anggota Koperasi Nusantara Merah Putih',
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Midtrans Snap JS */}
      <script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        async
      />
      {children}
    </>
  );
}
```

### 📄 Environment Variables

```env
# .env.local

# API URL (Laravel Backend)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Midtrans
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx
NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION=false
```

---

## 3. REGISTRATIONSUCCESS COMPONENT

### 📄 RegistrationSuccess Component

```typescript
// src/components/registration/RegistrationSuccess.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle2,
  Mail,
  Clock,
  AlertCircle,
  ArrowRight,
  Download,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RegistrationData } from '@/app/daftar/page';

interface RegistrationSuccessProps {
  data: RegistrationData;
}

export function RegistrationSuccess({ data }: RegistrationSuccessProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTierLabel = (tierId: string) => {
    const tiers: Record<string, string> = {
      '2': 'KORWIL (Pimpinan Provinsi)',
      '3': 'KORDA (Pimpinan Kabupaten/Kota)',
      '4': 'KORCAM (Pimpinan Kecamatan)',
      '5': 'KORDES (Pimpinan Desa)',
      '6': 'Anggota Biasa',
      '7': 'Mitra Bisnis',
    };
    return tiers[tierId] || 'Anggota';
  };

  const getNextSteps = () => {
    if (data.tier_id === '7') {
      return [
        { step: 1, text: 'Tim kami akan menghubungi Anda dalam 1x24 jam' },
        { step: 2, text: 'Verifikasi dokumen perusahaan' },
        { step: 3, text: 'Pembahasan kemitraan' },
        { step: 4, text: 'Penandatanganan MoU' },
      ];
    }
    return [
      { step: 1, text: 'Verifikasi data oleh admin (1-3 hari kerja)' },
      { step: 2, text: 'Pengecekan ketersediaan posisi' },
      { step: 3, text: 'Approval dan aktivasi akun' },
      { step: 4, text: 'Penerbitan kartu anggota' },
    ];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-gray-600">
          Terima kasih telah mendaftar sebagai {getTierLabel(data.tier_id)} KNMP
        </p>
      </motion.div>

      {/* Registration Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Detail Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-500">Nama</span>
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-500">No. HP</span>
              <span className="font-medium">{data.phone}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-500">Paket</span>
              <Badge className="bg-[#008F3D]">{data.tier_name}</Badge>
            </div>
            {data.province_name && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-500">Lokasi</span>
                <span className="font-medium text-right">
                  {[data.village_name, data.district_name, data.regency_name, data.province_name]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Total Pembayaran</span>
              <span className="font-bold text-[#008F3D] text-lg">
                {formatCurrency(data.tier_price)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-yellow-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-yellow-800">Menunggu Verifikasi</p>
              <p className="text-sm text-yellow-700 mt-1">
                Pendaftaran Anda sedang dalam proses verifikasi. Kami akan menghubungi Anda
                melalui email setelah proses verifikasi selesai.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Langkah Selanjutnya</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getNextSteps().map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#008F3D] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {item.step}
                </div>
                <p className="text-gray-600 pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Notice */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="text-blue-500">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium text-blue-800">Cek Email Anda</p>
              <p className="text-sm text-blue-700 mt-1">
                Kami telah mengirimkan konfirmasi pendaftaran ke{' '}
                <span className="font-medium">{data.email}</span>. Pastikan untuk
                memeriksa folder spam jika tidak menemukan email di inbox.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="px-6">
          <Download className="w-4 h-4 mr-2" />
          Download Bukti
        </Button>
        <Button variant="outline" className="px-6">
          <Share2 className="w-4 h-4 mr-2" />
          Bagikan
        </Button>
        <Link href="/">
          <Button className="bg-[#008F3D] hover:bg-[#00702E] px-6 w-full">
            Kembali ke Beranda
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Contact Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Ada pertanyaan? Hubungi kami:</p>
        <p className="font-medium text-gray-700 mt-1">
          WhatsApp: 0812-3456-7890 | Email: info@knmp.or.id
        </p>
      </div>
    </div>
  );
}
```

---

## 4. PROGRESSINDICATOR COMPONENT

### 📄 ProgressIndicator Component

```typescript
// src/components/registration/ProgressIndicator.tsx
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: currentStep >= step.id ? '#008F3D' : '#E5E7EB',
                  scale: currentStep === step.id ? 1.1 : 1,
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-500'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </motion.div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-xs text-gray-400 hidden lg:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: currentStep > step.id ? '#008F3D' : '#E5E7EB',
                  }}
                  className="h-0.5 w-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-700">
            Langkah {currentStep} dari {steps.length}
          </p>
          <p className="text-sm text-gray-500">{steps[currentStep - 1]?.name}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={false}
            animate={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
            className="bg-[#008F3D] h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## 5. ADDITIONAL COMPONENTS

### 📄 LocationController (Laravel Backend)

```php
<?php
// app/Http/Controllers/Api/LocationController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Province;
use App\Models\Regency;
use App\Models\District;
use App\Models\Village;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function provinces()
    {
        $provinces = Province::select('id', 'code', 'name')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $provinces
        ]);
    }

    public function regencies(Request $request)
    {
        $query = Regency::select('id', 'province_id', 'code', 'name')
            ->orderBy('name');

        if ($request->province_id) {
            $query->where('province_id', $request->province_id);
        }

        $regencies = $query->get();

        return response()->json([
            'success' => true,
            'data' => $regencies
        ]);
    }

    public function districts(Request $request)
    {
        $query = District::select('id', 'regency_id', 'code', 'name')
            ->orderBy('name');

        if ($request->regency_id) {
            $query->where('regency_id', $request->regency_id);
        }

        $districts = $query->get();

        return response()->json([
            'success' => true,
            'data' => $districts
        ]);
    }

    public function villages(Request $request)
    {
        $query = Village::select('id', 'district_id', 'code', 'name')
            ->orderBy('name');

        if ($request->district_id) {
            $query->where('district_id', $request->district_id);
        }

        $villages = $query->get();

        return response()->json([
            'success' => true,
            'data' => $villages
        ]);
    }
}
```

### 📄 MemberController (Laravel Backend)

```php
<?php
// app/Http/Controllers/Api/MemberController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function profile(Request $request)
    {
        $member = $request->user()->member;

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Data member tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $member->load([
                'tier',
                'province',
                'regency',
                'district',
                'village'
            ])
        ]);
    }

    public function updateProfile(Request $request)
    {
        $member = $request->user()->member;

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Data member tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'phone' => 'sometimes|string|max:20',
            'alamat' => 'sometimes|string|max:500',
            'pekerjaan' => 'sometimes|string|max:50',
            'photo' => 'sometimes|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('members/photo', 'public');
            $validated['photo'] = $path;
        }

        $member->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => $member->fresh()
        ]);
    }
}
```

---

## ✅ CHECKLIST PART 4

- [x] PaymentSection Component dengan pilihan metode pembayaran
- [x] Midtrans Snap Integration
- [x] RegistrationSuccess Component
- [x] ProgressIndicator Component
- [x] LocationController (Backend)
- [x] MemberController (Backend)

---

## 📖 LANJUT KE PART 5

Part 5 akan membahas:
- cPanel Deployment (Tanpa SSH)
- Database Seeder untuk Wilayah Indonesia
- Admin Panel Dashboard
- Email Templates
- Testing & Debugging

---

*Dokumen ini adalah bagian dari Tutorial Backend Laravel KNMP*
*Total Parts: 5 Dokumen*
