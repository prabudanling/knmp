'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users, Shield, Award, Building2, MapPin, ChevronRight, ChevronDown, ChevronUp,
  CheckCircle2, ArrowRight, Star, Globe, Scale, Target, Flag, TrendingUp,
  Landmark, Network, Crown, Briefcase, GraduationCap, Heart, Lightbulb,
  Gavel, Monitor, Utensils, Factory, Truck, Stethoscope, Banknote, Handshake,
  Cpu, Palmtree, Plane, Megaphone, Globe2, Leaf, Camera, Upload, X, Loader2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// ==================== ANIMATION VARIANTS ====================
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const slideInLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } };

// ==================== PHOTO UPLOAD HOOK ====================
function usePhotoUpload() {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});

  const uploadPhoto = useCallback(async (memberId: string, file: File) => {
    setUploadingId(memberId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('memberId', memberId);
      const res = await fetch('/api/upload/photo', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setPhotos(prev => ({ ...prev, [memberId]: data.photoUrl + '?t=' + Date.now() }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingId(null);
    }
  }, []);

  return { uploadingId, photos, uploadPhoto };
}

// ==================== MEMBER PHOTO CARD ====================
function MemberPhotoCard({
  memberId, name, position, photo, accentColor = '#8B0000', size = 'md',
  uploadingId, photos, onUpload, description, details, status,
}: {
  memberId: string; name: string; position: string; photo?: string;
  accentColor?: string; size?: 'sm' | 'md' | 'lg';
  uploadingId: string | null; photos: Record<string, string>;
  onUpload: (id: string, file: File) => void;
  description?: string; details?: string[]; status?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const isUploading = uploadingId === memberId;
  const currentPhoto = photos[memberId] || photo;
  const initials = name.replace(/\(.*\)/g, '').split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase();

  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  };
  const photoSize = sizeClasses[size];

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onUpload(memberId, file);
  }, [memberId, onUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(memberId, file);
  }, [memberId, onUpload]);

  return (
    <motion.div variants={scaleIn} className="group">
      <Card className={cn(
        "overflow-hidden transition-all duration-500 hover:shadow-2xl relative h-full",
        "border-2 hover:border-opacity-60",
        status === 'kosong' && 'opacity-60 border-dashed',
        status === 'pending' && 'border-amber-300/50',
      )} style={{ borderColor: status === 'kosong' ? undefined : accentColor + '30' }}>
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />

        <CardContent className="p-5 flex flex-col items-center text-center">
          {/* Photo with Upload Overlay */}
          <div
            className={cn("relative rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-background mb-4 cursor-pointer", photoSize, dragOver && 'ring-amber-400 scale-105 transition-all')}
            style={{ ringColor: accentColor + '40' }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {currentPhoto ? (
              <Image src={currentPhoto} alt={name} fill className="object-cover" sizes="128px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
                {initials}
              </div>
            )}

            {/* Upload Overlay */}
            <div className={cn(
              "absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-300",
              isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : (
                <>
                  <Camera className="w-7 h-7 text-white mb-1" />
                  <span className="text-white text-xs font-medium">Upload Foto</span>
                </>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Name & Position */}
          <Badge variant="outline" className="text-[10px] mb-2 font-semibold uppercase tracking-wider" style={{ borderColor: accentColor, color: accentColor }}>
            {position}
          </Badge>
          <h4 className="font-bold text-sm leading-tight mb-1">{name}</h4>
          {description && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>}

          {/* Status Badge */}
          {status === 'kosong' && <Badge variant="outline" className="text-[10px] border-amber-400 text-amber-600">Vacant</Badge>}
          {status === 'pending' && <Badge variant="outline" className="text-[10px] border-blue-400 text-blue-600">Dalam Proses</Badge>}

          {/* Expandable Details */}
          {details && details.length > 0 && (
            <>
              <button onClick={() => setExpanded(!expanded)} className="mt-2 text-[11px] flex items-center gap-1 hover:text-[#008F3D] transition-colors">
                {expanded ? 'Sembunyikan' : 'Lihat Profil'}
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full overflow-hidden">
                    <ul className="mt-2 space-y-1 text-left">
                      {details.map((line, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px]">
                          <ChevronRight className="w-3 h-3 text-[#008F3D] flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ==================== SECTION HEADER ====================
function SectionHeader({ bab, title, subtitle, badge, badgeColor = '#8B0000' }: { bab: string; title: string; subtitle: string; badge?: string; badgeColor?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
      {badge && (
        <motion.div variants={fadeInUp}>
          <Badge className="text-white px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: badgeColor }}>{badge}</Badge>
        </motion.div>
      )}
      <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
        <span className="text-muted-foreground/60 font-light">{bab}</span>{' '}
        <span className="text-gradient-primary">{title}</span>
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-muted-foreground text-base max-w-2xl mx-auto">{subtitle}</motion.p>
    </motion.div>
  );
}

// ==================== FLOATING NAV ====================
function FloatingNav({ activeSection }: { activeSection: string }) {
  const sections = [
    { id: 'hero', label: '⬆' },
    { id: 'bab1', label: 'I' }, { id: 'bab2', label: 'II' }, { id: 'bab3', label: 'III' },
    { id: 'bab4', label: 'IV' }, { id: 'bab5', label: 'V' }, { id: 'bab6', label: 'VI' },
    { id: 'bab7', label: 'VII' }, { id: 'bab8', label: 'VIII' }, { id: 'bab9', label: 'IX' }, { id: 'bab10', label: 'X' },
  ];

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-1">
      {sections.map(s => (
        <a key={s.id} href={`#${s.id}`}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300",
            activeSection === s.id ? 'bg-[#8B0000] text-white scale-110 shadow-lg' : 'bg-muted/80 text-muted-foreground hover:bg-[#8B0000]/20'
          )}>
          {s.label}
        </a>
      ))}
    </div>
  );
}

// ==================== DATA ====================
const HIERARKI_KOMANDO = [
  { tingkat: 'I', nama: 'BAKORNAS', namaLengkap: 'Badan Koordinasi Nasional', sebutan: 'Presiden / Ketua Umum', wilayah: 'Seluruh NKRI', padanan: 'Pimpinan Tertinggi Eksekutif Nasional', icon: Landmark, color: '#8B0000' },
  { tingkat: 'II', nama: 'BAKORWIL', namaLengkap: 'Badan Koordinasi Wilayah', sebutan: 'Panglima Wilayah', wilayah: 'Provinsi (34 Wilayah)', padanan: 'Koordinator Provinsi — Setara Gubernur KMN BERDIKARI', icon: MapPin, color: '#008F3D' },
  { tingkat: 'III', nama: 'BAKORDA', namaLengkap: 'Badan Koordinasi Daerah', sebutan: 'Panglima Distrik', wilayah: 'Kabupaten/Kota (514 Daerah)', padanan: 'Koordinator Daerah — Setara Bupati/Wali Kota KMN BERDIKARI', icon: Building2, color: '#1a1a2e' },
  { tingkat: 'IV', nama: 'BAKORCAM', namaLengkap: 'Badan Koordinasi Kecamatan', sebutan: 'Panglima Sektor', wilayah: 'Kecamatan (7.266 Sektor)', padanan: 'Koordinator Kecamatan — Setara Camat KMN BERDIKARI', icon: Network, color: '#059669' },
  { tingkat: 'V', nama: 'BAKORDEKA', namaLengkap: 'Badan Koordinasi Desa/Kelurahan', sebutan: 'Komandan Lapangan', wilayah: 'Desa/Kelurahan (83.763 Titik)', padanan: 'Eksekutor Lapangan — Ujung Tombak KMN BERDIKARI', icon: Flag, color: '#7c3aed' },
];

const DEWAN_PEMBINA = [
  { id: 'pembina1', nama: 'Dr. Ferry Juliantono, S.E., Ak., M.Si.', jabatan: 'Menteri Koperasi RI', photo: '/images/people/pembina.svg', color: '#8B0000', profil: ['Menteri Koperasi Republik Indonesia (sejak 2025)', 'Wakil Ketua Umum Dewan Koperasi Indonesia (Dekopin) sejak 2019', 'Ketua Dewan Pengawas Induk Koperasi Pondok Pesantren (INKOPONTREN)', 'Sekretaris Dewan Pengurus Induk Koperasi Unit Desa (INKURDE)', 'Wakil Ketua Umum Bidang Penggalangan Massa DPP Partai Gerindra', 'Sekretaris Jenderal Asosiasi Islam (SI) periode 2021–2026', 'Mantan Ketua Induk Koperasi Pedagang Pasar (Inkoppas) 2019–2022', 'Mantan Wakil Menteri Koperasi (2024–2025)'] },
  { id: 'pembina2', nama: 'Widiyanti Putri Wardhana, B.Sc.', jabatan: 'Menteri Pariwisata RI', photo: '/images/people/pembina2.svg', color: '#008F3D', profil: ['Menteri Pariwisata Republik Indonesia (Kabinet Merah Putih)', 'Co-founder Teladan Group', 'Mantan Direktur PT Teladan Aprima Agro (2012–2021)', 'Mantan Komisaris PT Teladan Prima Agro Tbk (2021–2024)'] },
  { id: 'pembina3', nama: 'Jenderal TNI (Purn.) Dr. H. Moeldoko, S.I.P.', jabatan: 'Mantan Panglima TNI', photo: '/images/people/pembina3.svg', color: '#1a1a2e', profil: ['Mantan Panglima TNI (2013–2015)', 'Mantan Kepala Staf Kepresidenan (KSP) era Jokowi (2015–2024)', 'Ketua Umum Partai Demokrat (KLB 2021)'] },
  { id: 'pembina4', nama: 'Dr. H. Sandiaga Salahuddin Uno, B.B.A., M.B.A.', jabatan: 'Mantan Menparekraf & Pengusaha', photo: '/images/people/pembina4.svg', color: '#059669', profil: ['Mantan Menteri Pariwisata dan Ekonomi Kreatif (2020–2024)', 'Mantan Wakil Gubernur DKI Jakarta (2017–2022)', 'Pendiri Saratoga Capital / Saratoga Investama Sedaya', 'Mantan Ketua Umum HIPMI (2005–2008)', 'Calon Wakil Presiden 2019 (mendampingi Prabowo Subianto)', 'CEO/Pimpinan PT Tower Bersama Infrastruktur Group Tbk'] },
  { id: 'pembina5', nama: 'Drs. Teten Masduki', jabatan: 'Mantan Menteri Koperasi & UMKM', photo: '/images/people/pembina5.svg', color: '#7c3aed', profil: ['Mantan Menteri Koperasi dan UMKM (2019–2024)', 'Mantan Kepala Staf Kepresidenan (2015–2018)', 'Pendiri & Mantan Sekretaris Jenderal Transparency International Indonesia', 'Koordinator Indonesia Corruption Watch (ICW)'] },
  { id: 'pembina6', nama: 'Dr. A. Iskandar Zulkarnain', jabatan: 'Mantan Kepala LIPI', photo: '/images/people/pembina6.svg', color: '#B7791F', profil: ['Mantan Kepala Lembaga Ilmu Pengetahuan Indonesia (LIPI)', 'Mantan Anggota Dewan Pengurus & Chief Investment Officer (CIO) BPKH', 'Profesor Riset Bidang Geologi dan Geofisika'] },
];

const DEWAN_PENGAWAS = [
  { id: 'pengawas1', jabatan: 'Ketua Dewan Pengawas', nama: 'Prof. Dr. Elan Masbulan', photo: '/images/people/pengawas1.svg', keterangan: 'Akademisi/Peneliti bidang pertanian di lingkungan UGM', profil: ['Akademisi/Peneliti bidang pertanian di lingkungan UGM'] },
  { id: 'pengawas2', jabatan: 'Anggota Dewan Pengawas', nama: 'Dr. Habib', photo: '/images/people/pengawas2.svg', keterangan: 'Pakar ketahanan pangan · Ketua Umum Asosiasi Pertanian', profil: ['Pakar di bidang ketahanan pangan', 'Ketua Umum Asosiasi Pertanian'] },
];

const DEWAN_PAKAR = [
  { id: 'pakar1', jabatan: 'Ketua Dewan Pakar', nama: 'Prof. Dr. Teddy Mantoro, M.Sc., Ph.D., SMIEEE', photo: '/images/people/sekjen.svg', keterangan: 'Ahli AI & Deep Learning · Director School of CS Nusa Putra', profil: ['Director, School of Computer Science, Nusa Putra University', 'Professor di Sampoerna University, Jakarta', 'Senior Member IEEE (SMIEEE)', 'Lulusan PhD dari The Australian National University', 'Peneliti bidang Artificial Intelligence, Deep Learning, dan Information Security (cited 2.796+ di Google Scholar)'] },
];

const DEWAN_PENASEHAT = [
  { id: 'penasihat1', jabatan: 'Ketua Dewan Penasehat', nama: 'Prof. Dr. H. Anwar Sanusi, S.H., S.Pel., M.M.', photo: '/images/people/penasihat1.svg', keterangan: 'Mantan Sekjen Kemnaker · Guru Besar UB', profil: ['Mantan Sekretaris Jenderal Kementerian Ketenagakerjaan RI (sejak 2020)', 'Kepala Badan Perencanaan dan Pengembangan Ketenagakerjaan (Barenbang) Kemnaker', 'Guru Besar Profesor Ilmu Kebijakan Publik, Universitas Brawijaya', 'Mantan Anggota DPR RI (Fraksi PPP)', 'Wakil Ketum PP KAGAMA (Keluarga Alumni UGM)'] },
  { id: 'penasihat2', jabatan: 'Anggota Dewan Penasehat', nama: 'Dr. Heri Solahudin', photo: '/images/people/penasihat2.svg', keterangan: 'Peneliti Senior CSEAS Kyoto University', profil: ['Peneliti senior di Center for Southeast Asian Studies (CSEAS), Kyoto University, Jepang', 'Penulis buku "The Roots of ISIS in Indonesia"'] },
];

const PENGURUS_HARIAN = [
  { id: 'ketua', jabatan: 'Presiden / Ketua Umum', nama: 'Dr. N. Rusmiati, M.Si., M.H.', photo: '/images/people/ketua.svg', keterangan: 'Ketua Umum DPP ASITA 2019–2029 · CEO PT Patih Indo Group', status: 'terisi' as const, profil: ['Ketua Umum DPP ASITA periode 2019–2024 & 2024–2029', 'CEO & Owner PT Patih Indo Group'] },
  { id: 'waketum', jabatan: 'Wakil Ketua Umum', nama: 'Prof. Wirono, S.E., M.Pd.', photo: '/images/people/waketum.svg', keterangan: 'Mantan Marketing AJB Bumi Putera · Mantan Caleg DPRD DKI', status: 'terisi' as const, profil: ['Mantan Marketing AJB Bumi Putera (1995–1999)', 'Mantan Caleg DPRD Provinsi DKI Jakarta'] },
  { id: 'sekjen', jabatan: 'Sekretaris Jenderal / CEO NB', nama: 'Drs. H. Arif Rachman Hakim, M.M.', photo: '/images/people/sekjen.svg', keterangan: 'Inisiator Architect Koperasi Nusa Berdikari · President Director Top Umroh', status: 'terisi' as const, profil: ['Ex. Komisaris Utama PT Aero Umroh Nusantara', 'Ex. Ketua Umum Syarikah Haji Umroh Indonesia', 'Inisiator Digitalisasi dan Transformasi Digital Haji dan Umroh di Indonesia bersama Kementrian Agama 2014–2019', 'Ketua Umum Asosiasi Singkong', 'Ex. Ketua KNPI', 'Inisiator Architect Koperasi Nusa Berdikari Merah Putih', 'President Director Top Umroh', 'CEO PT Arofah Global Sistem'] },
  { id: 'wasekjen', jabatan: 'Wakil Sekretaris Jenderal / Grand Architect & COO', nama: 'H. Gugun Gunara, S.E.', photo: '/images/people/wasekjen.svg', keterangan: 'Senior Konsultan 16+ tahun · Grand Architect KMN BERDIKARI', status: 'terisi' as const, profil: ['Senior Konsultan Bisnis, Manajemen & Perijinan (16+ tahun pengalaman bisnis)', 'ex. Direktur Operasional PT Aero Umroh Nusantara', 'Kontributor Konseptor Digitalisasi Haji dan Umroh 2014–2019 di Kementrian Agama RI', 'Ex. Ketua Bidang Dalam Negeri di Asosiasi Haji dan Umroh', 'Sekjen Majelis Umroh Nusantara', 'Grand Architect & Chief Operational Officer Kopnusa', 'Direktur Operasional PT Arofah Global Sistem'] },
  { id: 'bendahara', jabatan: 'Bendahara Umum', nama: 'Belum terisi', photo: '', keterangan: 'Dipilih melalui RAT Perdana', status: 'kosong' as const, profil: [] },
];

const DEWAN_PENDIRI = [
  { id: 'pendiri1', no: 1, nama: 'Drs. H. Arif Rachman Hakim, M.M.', jabatan: 'Sekretaris Jenderal / CEO NB', photo: '/images/people/sekjen.svg', tahun: '2029', status: 'Aktif', detailProfil: ['Ex. Komisaris Utama PT Aero Umroh Nusantara', 'Inisiator Architect Koperasi Nusa Berdikari Merah Putih', 'President Director Top Umroh', 'CEO PT Arofah Global Sistem'] },
  { id: 'pendiri2', no: 2, nama: 'Dr. N. Rusmiati, M.Si., M.H.', jabatan: 'Presiden / Ketua Umum', photo: '/images/people/ketua.svg', tahun: '2029', status: 'Aktif', detailProfil: ['Ketua Umum DPP ASITA 2019–2029', 'CEO & Owner PT Patih Indo Group'] },
  { id: 'pendiri3', no: 3, nama: 'Prof. Wirono, S.E., M.Pd.', jabatan: 'Wakil Ketua Umum', photo: '/images/people/waketum.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri4', no: 4, nama: 'Prof. Dr. Elan Masbulan', jabatan: 'Ketua Dewan Pengawas', photo: '/images/people/pengawas1.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri5', no: 5, nama: 'Prof. Dr. H. Anwar Sanusi, S.H., S.Pel., M.M.', jabatan: 'Ketua Dewan Penasehat', photo: '/images/people/penasihat1.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri6', no: 6, nama: 'Prof. Dr. Teddy Mantoro, M.Sc., Ph.D., SMIEEE', jabatan: 'Ketua Dewan Pakar', photo: '/images/people/sekjen.svg', tahun: '—', status: 'Aktif' },
  { id: 'pendiri7', no: 7, nama: 'H. Gugun Gunara, S.E.', jabatan: 'Wakil Sekretaris Jenderal / Grand Architect & COO', photo: '/images/people/wasekjen.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri8', no: 8, nama: 'Komjen. Pol. (Purn.) Dharma Pongrekun', jabatan: 'Ketua Bidang Keamanan Siber', photo: '/images/people/pembina.svg', tahun: '2029', status: 'Aktif', detailProfil: ['Mantan Wakil Kepala Badan Siber dan Sandi Negara (BSSN) 2019–2021', 'Mantan Deputi Bidang Identifikasi dan Deteksi BSSN', 'Mantan Pati Bareskrim Polri', 'Calon Gubernur DKI Jakarta (independen) 2024', 'Purnawirawan Polisi bintang 3'] },
  { id: 'pendiri9', no: 9, nama: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.', jabatan: 'Ketua Bidang Hukum dan Advokasi', photo: '/images/people/pembina2.svg', tahun: '2029', status: 'Aktif', detailProfil: ['Terlibat dalam pengawasan pemilu (tercatat dalam dokumen Bawaslu Lebak)', 'Pengacara aktif sampai saat ini'] },
  { id: 'pendiri10', no: 10, nama: 'Dr. Habib', jabatan: 'Anggota Dewan Pengawas', photo: '/images/people/pengawas2.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri11', no: 11, nama: 'Dr. Heri Solahudin', jabatan: 'Anggota Dewan Penasehat', photo: '/images/people/penasihat2.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri12', no: 12, nama: 'Ir. Endro Wuryanto, M.M.', jabatan: 'Koordinator Bidang Infrastruktur Digital', photo: '/images/people/pembina3.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri13', no: 13, nama: 'Sae Tanangga Karim, S.E.', jabatan: 'Koordinator Bidang Event Organizer', photo: '/images/people/pembina4.svg', tahun: '2029', status: 'Aktif', detailProfil: ['General Manager PT Dyandra Promosindo (pengelola IIMS, pameran internasional)', 'Ex. Di ASMINDO'] },
  { id: 'pendiri14', no: 14, nama: 'Hj. Inna Hadianala, S.E.', jabatan: 'Koordinator Bidang Pengembangan SDM & Organisasi', photo: '/images/people/pembina5.svg', tahun: '2029', status: 'Aktif', detailProfil: ['Ex. Anggota DPRD Prov. Jawa Tengah', 'Mantan Anggota DPRD Kabupaten Cilacap (Fraksi PPP)', 'Wakil Sekretaris DPW PPP Jawa Tengah', 'Aktivis, guru, dan pengusaha', 'Ex. Caleg DPR RI Dapil Jawa Tengah II (PPP)'] },
  { id: 'pendiri15', no: 15, nama: 'Andi Darmadji, S.E.', jabatan: 'Koordinator Wilayah Kalimantan', photo: '/images/people/pembina6.svg', tahun: '2029', status: 'Aktif' },
  { id: 'pendiri16', no: 16, nama: '(Posisi Belum Terisi)', jabatan: '—', photo: '', tahun: '2029', status: 'Vacant' },
  { id: 'pendiri17', no: 17, nama: 'dr. Hanson Barki', jabatan: 'Koordinator Bidang Adab dan Budaya', photo: '/images/people/pembina2.svg', tahun: '—', status: 'Aktif', detailProfil: ['Dokter', 'Komisaris Utama PT Hanara Batik', 'Pernah memberikan pelatihan batik Hanara di Kedutaan Besar RI di Washington DC, AS (diliput VOA Indonesia)'] },
];

const STRUKTUR_OPERASIONAL = [
  { id: 'bidang1', no: 1, bidang: 'Organisasi & Keanggotaan', ketua: 'Hj. Inna Hadianala, S.E.', catatan: 'Ex. Anggota DPRD Prov. Jawa Tengah', status: 'terisi' as const, icon: Users, photo: '/images/people/pembina5.svg' },
  { id: 'bidang2', no: 2, bidang: 'Pangan & Ketahanan Pangan', ketua: 'Dr. Habib', catatan: 'Pakar ketahanan pangan', status: 'terisi' as const, icon: Utensils, photo: '/images/people/pengawas2.svg' },
  { id: 'bidang3', no: 3, bidang: 'Industri & Manufaktur', ketua: '(RAT Perdana)', catatan: 'Vacant — Diisi melalui RAT Perdana', status: 'kosong' as const, icon: Factory, photo: '' },
  { id: 'bidang4', no: 4, bidang: 'Logistik & Distribusi', ketua: 'M. Ilham', catatan: '', status: 'terisi' as const, icon: Truck, photo: '' },
  { id: 'bidang5', no: 5, bidang: 'Kesehatan & Farmasi', ketua: '(RAT Perdana)', catatan: 'Vacant — Diisi melalui RAT Perdana', status: 'kosong' as const, icon: Stethoscope, photo: '' },
  { id: 'bidang6', no: 6, bidang: 'Keuangan & Perbankan', ketua: 'Fawwaz Arif Al Jabar, S.E., M.M.', catatan: 'Anggota DPRD Jawa Tengah', status: 'terisi' as const, icon: Banknote, photo: '' },
  { id: 'bidang7', no: 7, bidang: 'Holding Trading Ekosistem', ketua: 'H. Gugun Gunara, S.E.', catatan: 'Senior Konsultan, Grand Architect & COO', status: 'terisi' as const, icon: Briefcase, photo: '/images/people/wasekjen.svg' },
  { id: 'bidang8', no: 8, bidang: 'Bisnis Kemitraan & UMKM', ketua: 'Ongky Putra', catatan: '', status: 'terisi' as const, icon: Handshake, photo: '' },
  { id: 'bidang9', no: 9, bidang: 'Digital & Teknologi', ketua: 'M. Sidik', catatan: '', status: 'terisi' as const, icon: Cpu, photo: '' },
  { id: 'bidang10', no: 10, bidang: 'Adab & Budaya', ketua: 'dr. Hanson Barki', catatan: 'Dokter; Komisaris Utama PT Hanara Batik', status: 'terisi' as const, icon: Heart, photo: '/images/people/pembina2.svg' },
  { id: 'bidang11', no: 11, bidang: 'Hukum & Advokasi', ketua: 'Mayor Art. (Purn.) Cecep Sumarno, S.I.P., S.H.', catatan: 'Pengawasan pemilu (Bawaslu Lebak)', status: 'terisi' as const, icon: Gavel, photo: '/images/people/pembina2.svg' },
  { id: 'bidang12', no: 12, bidang: 'Haji dan Umroh', ketua: 'H. Abu Bakar', catatan: 'Owner dan CEO AL MUKTARA GROUPS', status: 'terisi' as const, icon: Plane, photo: '' },
  { id: 'bidang13', no: 13, bidang: 'Pengembangan SDM & Diklat', ketua: '(Dalam Proses Pengesahan)', catatan: 'In ratification', status: 'pending' as const, icon: GraduationCap, photo: '' },
  { id: 'bidang14', no: 14, bidang: 'Ekspor Impor & Perdagangan Internasional', ketua: '(Dalam Proses Pengesahan)', catatan: 'In ratification', status: 'pending' as const, icon: Globe2, photo: '' },
  { id: 'bidang15', no: 15, bidang: 'Hubungan Masyarakat & Media', ketua: '(Dalam Proses Pengesahan)', catatan: 'In ratification', status: 'pending' as const, icon: Megaphone, photo: '' },
  { id: 'bidang16', no: 16, bidang: 'Teknologi & Inovasi', ketua: '(Dalam Proses Pengesahan)', catatan: 'In ratification', status: 'pending' as const, icon: Monitor, photo: '' },
  { id: 'bidang17', no: 17, bidang: 'Kemitraan Internasional', ketua: '(Dalam Proses Pengesahan)', catatan: 'In ratification', status: 'pending' as const, icon: Globe, photo: '' },
];

const KOORDINATOR_KAWASAN = [
  { no: 1, kawasan: 'JAWA (Bakorwil Jawa)', panglima: '(Kosong — Prioritas Utama)', cakupan: 'DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur, DI Yogyakarta, Banten (6 Provinsi)', catatan: 'Pusat Populasi & Ekonomi NKRI | Prioritas Rekrutmen 35.000+ Desa Target', status: 'kosong', prioritas: true },
  { no: 2, kawasan: 'SUMATERA (Bakorwil Sumatera)', panglima: 'Erick Hariadi (Jaringan KADIN)', cakupan: 'Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepri, Jambi, Bengkulu, Sumatera Selatan, Babel, Lampung (10 Provinsi)', catatan: 'Komoditas: Sawit, Karet, Kopi, Lada, Batubara | Gateway Ekspor ASEAN', status: 'terisi' },
  { no: 3, kawasan: 'KALIMANTAN (Bakorwil Kalimantan)', panglima: 'Andi Darmadji, S.E. (Pendiri ke-15 KMN BERDIKARI)', cakupan: 'Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, Kalimantan Utara (5 Provinsi)', catatan: 'IKN Nusantara — Episentrum Baru | Sawit, Batubara, Rotan', status: 'terisi' },
  { no: 4, kawasan: 'SULAWESI & MALUKU (Bakorwil Sulawesi-Maluku)', panglima: 'Imam Fauzan (Koordinator Sulawesi)', cakupan: 'Sulawesi Utara, Sulawesi Tengah, Sulawesi Selatan, Sulawesi Tenggara, Gorontalo, Sulawesi Barat, Maluku, Maluku Utara (8 Provinsi)', catatan: 'Nikel, Kakao, Cengkeh, Rempah, Perikanan Laut Dalam | Ekonomi Biru', status: 'terisi' },
  { no: 5, kawasan: 'PAPUA & WILAYAH TIMUR (Bakorwil Papua & NTT)', panglima: '(Kosong — Prioritas Strategis)', cakupan: 'Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya, NTT (7 Provinsi)', catatan: 'Kawasan Perbatasan & Sumber Daya | Emas, Perikanan, Pariwisata', status: 'kosong', prioritas: true },
];

const REKAPITULASI = [
  { komponen: 'Dewan Pembina', status: 'LENGKAP', keterangan: '6 Anggota Prominan', color: 'green' },
  { komponen: 'Dewan Pengawas', status: 'LENGKAP', keterangan: '2 Anggota', color: 'green' },
  { komponen: 'Dewan Pakar', status: 'LENGKAP', keterangan: '1 Ketua Dewan Pakar', color: 'green' },
  { komponen: 'Dewan Penasehat', status: 'LENGKAP', keterangan: '2 Anggota', color: 'green' },
  { komponen: 'Pengurus Harian', status: '4/5 Terisi', keterangan: 'Bendahara Umum Belum Terisi', color: 'yellow' },
  { komponen: 'Dewan Pendiri', status: 'LENGKAP', keterangan: '17 Pendiri (ganjil) — Sah & Legal', color: 'green' },
  { komponen: 'Struktur Operasional', status: '12/17 Terisi', keterangan: '5 Bidang Dalam Proses Pengesahan', color: 'yellow' },
  { komponen: 'Koordinator 5 Kawasan', status: '3/5 Terisi', keterangan: 'Jawa & Papua Kosong', color: 'yellow' },
];

const ROADMAP = [
  { fase: 'Fase 0 — Pendirian', timeline: '2025', target: '17 Pendiri ✅ | Dewan Pembina 6 Anggota ✅ | Akta Notaris' },
  { fase: 'Fase 1 — Konsolidasi', timeline: '2025', target: 'Bendahara Umum + Pengisian 5 Bidang Ratifikasi + Bakorwil Jawa' },
  { fase: 'Fase 2 — Ekspansi Pulau', timeline: '2026', target: 'Aktivasi 17 Bidang + Bakorwil Papua + Sekretaris Bidang' },
  { fase: 'Fase 3 — RAT Perdana', timeline: '2026', target: 'Pengesahan Seluruh Pengurus melalui RAT Perdana KMN BERDIKARI BERDIKARI' },
  { fase: 'Fase 4 — Operasional Penuh', timeline: '2027', target: 'Aktivasi Bakorwil 34 Provinsi + Bakorda 514 Daerah' },
];

// ==================== MAIN PAGE ====================
export default function StrukturOrganisasiPage() {
  const { uploadingId, photos, uploadPhoto } = usePhotoUpload();
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <main className="min-h-screen bg-background">
      <FloatingNav activeSection={activeSection} />

      {/* ===== HERO ===== */}
      <section id="hero" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#8B0000]/90 to-[#1a1a2e]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#008F3D]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="border-[#008F3D] text-[#008F3D] px-5 py-2 bg-white/10 text-sm">
                📋 Dokumen Resmi KMN BERDIKARI BERDIKARI
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Struktur Organisasi
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                KMN BERDIKARI BERDIKARI 2029
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih
            </motion.p>
            <motion.p variants={fadeInUp} className="text-base text-gray-400 max-w-2xl mx-auto">
              Rancangan Pengurus Nasional — Sistem Komando Bakor Nusantara
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 pt-4">
              <Badge className="bg-[#8B0000] text-white px-4 py-2 text-sm"><Scale className="w-4 h-4 mr-2" />UU 25/1992 · Permenkop 8/2021</Badge>
              <Badge className="bg-[#008F3D] text-[#1a1a2e] px-4 py-2 text-sm"><Globe className="w-4 h-4 mr-2" />UU 27/2022 · Inpres 9/2025</Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BAB I - HIERARKI KOMANDO ===== */}
      <section id="bab1" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB I" title="Hierarki Komando Bakor Nusantara" subtitle="Nomenklatur Resmi Sistem Koordinasi Wilayah — Setara dengan Struktur Komando Eksekutif Nasional" badge="5 Tingkatan" badgeColor="#8B0000" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            {HIERARKI_KOMANDO.map((item) => (
              <motion.div key={item.tingkat} variants={fadeInUp}>
                <Card className="card-hover-lift border-l-4 overflow-hidden" style={{ borderLeftColor: item.color }}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: item.color }}>
                          <item.icon className="w-7 h-7" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">Tingkat {item.tingkat}</Badge>
                          <h3 className="font-bold text-lg">{item.nama}</h3>
                          <p className="text-xs text-muted-foreground">{item.namaLengkap}</p>
                        </div>
                      </div>
                      <Separator orientation="vertical" className="hidden md:block h-12" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><p className="text-xs text-muted-foreground mb-1">Sebutan Kehormatan</p><p className="font-semibold text-sm">{item.sebutan}</p></div>
                        <div><p className="text-xs text-muted-foreground mb-1">Wilayah</p><p className="font-semibold text-sm">{item.wilayah}</p></div>
                        <div><p className="text-xs text-muted-foreground mb-1">Padanan Struktural</p><p className="font-semibold text-sm">{item.padanan}</p></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB II - DEWAN PEMBINA ===== */}
      <section id="bab2" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB II" title="Dewan Pembina" subtitle="6 tokoh nasional berpengalaman — Menteri, Jenderal, Pengusaha, dan Akademisi" badge="6 Anggota Prominan" badgeColor="#B7791F" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEWAN_PEMBINA.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.nama} position={item.jabatan}
                photo={item.photo} accentColor={item.color} size="lg" description={item.profil[0]}
                details={item.profil} uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB III - DEWAN PENGAWAS ===== */}
      <section id="bab3" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB III" title="Dewan Pengawas" subtitle="Pengawas Independen — Periode 2029" badge="2 Anggota" badgeColor="#8B0000" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEWAN_PENGAWAS.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.nama} position={item.jabatan}
                photo={item.photo} accentColor="#8B0000" size="lg" description={item.keterangan}
                details={item.profil} uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB IV - DEWAN PAKAR ===== */}
      <section id="bab4" className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB IV" title="Dewan Pakar" subtitle="Pakar bidang strategis yang memberikan masukan teknis dan akademis" badge="1 Ketua" badgeColor="#7c3aed" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex justify-center">
            {DEWAN_PAKAR.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.nama} position={item.jabatan}
                photo={item.photo} accentColor="#7c3aed" size="lg" description={item.keterangan}
                details={item.profil} uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB V - DEWAN PENASEHAT ===== */}
      <section id="bab5" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB V" title="Dewan Penasehat" subtitle="Penasehat Strategis — Periode 2029" badge="2 Anggota" badgeColor="#1a1a2e" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEWAN_PENASEHAT.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.nama} position={item.jabatan}
                photo={item.photo} accentColor="#1a1a2e" size="lg" description={item.keterangan}
                details={item.profil} uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB VI - PENGURUS HARIAN (PYRAMID) ===== */}
      <section id="bab6" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB VI" title="Pengurus Harian" subtitle="Pimpinan Eksekutif Harian — Periode 2029" badge="4/5 Terisi" badgeColor="#8B0000" />

          {/* Pyramid Layout */}
          <div className="space-y-6">
            {/* Tier 1: Presiden */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="max-w-md mx-auto">
              <Card className="border-2 border-[#8B0000]/40 overflow-hidden shadow-xl">
                <div className="h-2 bg-gradient-to-r from-[#8B0000] via-[#FFD700] to-[#8B0000]" />
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative rounded-full overflow-hidden ring-4 ring-[#8B0000]/30 ring-offset-4 ring-offset-background w-28 h-28 mb-4 cursor-pointer group"
                    onClick={() => document.getElementById('file-ketua')?.click()}>
                    {photos['ketua'] || PENGURUS_HARIAN[0].photo ? (
                      <Image src={photos['ketua'] || PENGURUS_HARIAN[0].photo} alt={PENGURUS_HARIAN[0].nama} fill className="object-cover" sizes="112px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl bg-gradient-to-br from-[#8B0000] to-[#6B0000]">NR</div>
                    )}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {uploadingId === 'ketua' ? <Loader2 className="w-8 h-8 text-white animate-spin" /> : <Camera className="w-7 h-7 text-white" />}
                    </div>
                    <input id="file-ketua" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto('ketua', f); }} />
                  </div>
                  <Badge className="bg-[#8B0000] text-white mb-2">👑 Presiden / Ketua Umum</Badge>
                  <h3 className="font-bold text-lg text-center">{PENGURUS_HARIAN[0].nama}</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">{PENGURUS_HARIAN[0].keterangan}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Connector */}
            <div className="flex justify-center"><div className="w-0.5 h-8 bg-gradient-to-b from-[#8B0000] to-[#008F3D]" /></div>

            {/* Tier 2: Wakil + Sekjen */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[PENGURUS_HARIAN[1], PENGURUS_HARIAN[2]].map((m) => (
                <motion.div key={m.id} variants={scaleIn}>
                  <Card className="border-2 border-[#008F3D]/30 overflow-hidden h-full">
                    <div className="h-1.5 bg-[#008F3D]" />
                    <CardContent className="p-5 flex flex-col items-center">
                      <div className="relative rounded-full overflow-hidden ring-3 ring-[#008F3D]/30 ring-offset-3 ring-offset-background w-20 h-20 mb-3 cursor-pointer group"
                        onClick={() => document.getElementById(`file-${m.id}`)?.click()}>
                        {photos[m.id] || m.photo ? (
                          <Image src={photos[m.id] || m.photo} alt={m.nama} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-[#008F3D] to-[#059669]">{m.nama.split(' ').slice(0,2).map(n=>n[0]).join('')}</div>
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {uploadingId === m.id ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
                        </div>
                        <input id={`file-${m.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(m.id, f); }} />
                      </div>
                      <Badge variant="outline" className="text-xs border-[#008F3D] text-[#008F3D] mb-1">{m.jabatan}</Badge>
                      <h4 className="font-bold text-sm text-center">{m.nama}</h4>
                      <p className="text-[10px] text-muted-foreground text-center mt-1">{m.keterangan}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Connector */}
            <div className="flex justify-center"><div className="w-0.5 h-8 bg-gradient-to-b from-[#008F3D] to-[#7c3aed]" /></div>

            {/* Tier 3: Wasekjen + Bendahara */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[PENGURUS_HARIAN[3], PENGURUS_HARIAN[4]].map((m) => (
                <motion.div key={m.id} variants={scaleIn}>
                  <Card className={cn("border-2 overflow-hidden h-full", m.status === 'kosong' ? 'border-dashed border-amber-300/50' : 'border-[#7c3aed]/30')}>
                    <div className={cn("h-1.5", m.status === 'kosong' ? 'bg-amber-300' : 'bg-[#7c3aed]')} />
                    <CardContent className="p-5 flex flex-col items-center">
                      <div className={cn("relative rounded-full overflow-hidden ring-3 ring-offset-3 ring-offset-background w-20 h-20 mb-3 cursor-pointer group",
                        m.status === 'kosong' ? 'ring-amber-300/30' : 'ring-[#7c3aed]/30')}
                        onClick={() => m.status !== 'kosong' && document.getElementById(`file-${m.id}`)?.click()}>
                        {m.status === 'kosong' ? (
                          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                            <Users className="w-8 h-8" />
                          </div>
                        ) : (photos[m.id] || m.photo) ? (
                          <Image src={photos[m.id] || m.photo} alt={m.nama} fill className="object-cover" sizes="80px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]">{m.nama.split(' ').slice(0,2).map(n=>n[0]).join('')}</div>
                        )}
                        {m.status !== 'kosong' && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {uploadingId === m.id ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Camera className="w-5 h-5 text-white" />}
                          </div>
                        )}
                        {m.status !== 'kosong' && <input id={`file-${m.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(m.id, f); }} />}
                      </div>
                      <Badge variant="outline" className={cn("text-xs mb-1", m.status === 'kosong' ? 'border-amber-400 text-amber-600' : 'border-[#7c3aed] text-[#7c3aed]')}>{m.jabatan}</Badge>
                      <h4 className="font-bold text-sm text-center">{m.nama}</h4>
                      <p className="text-[10px] text-muted-foreground text-center mt-1">{m.keterangan}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BAB VII - DEWAN PENDIRI ===== */}
      <section id="bab7" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB VII" title="Dewan Pendiri" subtitle="17 Pendiri (angka ganjil) — Memenuhi persyaratan quorum pengambilan keputusan" badge="17 Pendiri" badgeColor="#008F3D" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {DEWAN_PENDIRI.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.nama} position={`Pendiri ke-${item.no}`}
                photo={item.photo} accentColor={item.status === 'Vacant' ? '#d4d4d4' : '#008F3D'} size="sm"
                description={item.jabatan} details={item.detailProfil} status={item.status === 'Vacant' ? 'kosong' : undefined}
                uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB VIII - STRUKTUR OPERASIONAL ===== */}
      <section id="bab8" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB VIII" title="Struktur Operasional" subtitle="17 Ketua Bidang Operasional — Pilar Eksekutif KMN BERDIKARI BERDIKARI" badge="17 Bidang" badgeColor="#059669" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {STRUKTUR_OPERASIONAL.map((item) => (
              <MemberPhotoCard key={item.id} memberId={item.id} name={item.ketua} position={`Bidang ${item.no}: ${item.bidang}`}
                photo={item.photo} accentColor={item.status === 'terisi' ? '#059669' : item.status === 'pending' ? '#d97706' : '#9ca3af'}
                size="sm" description={item.catatan} status={item.status === 'kosong' ? 'kosong' : item.status === 'pending' ? 'pending' : undefined}
                uploadingId={uploadingId} photos={photos} onUpload={uploadPhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB IX - KOORDINATOR KAWASAN ===== */}
      <section id="bab9" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB IX" title="Koordinator 5 Kawasan" subtitle="Sistem Komando Wilayah Kepulauan NKRI — Dari Sabang sampai Merauke" badge="5 Kawasan" badgeColor="#1a1a2e" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            {KOORDINATOR_KAWASAN.map((item) => (
              <motion.div key={item.no} variants={fadeInUp}>
                <Card className={cn("card-hover-lift border-l-4 overflow-hidden", item.prioritas && 'ring-2 ring-amber-300/30')} style={{ borderLeftColor: item.status === 'terisi' ? '#008F3D' : '#d97706' }}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", item.status === 'terisi' ? 'bg-[#008F3D]' : 'bg-amber-500')}>
                          <MapPin className="w-7 h-7" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs mb-1">Kawasan {item.no}</Badge>
                          <h3 className="font-bold text-base">{item.kawasan}</h3>
                        </div>
                      </div>
                      <Separator orientation="vertical" className="hidden md:block h-12" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div><p className="text-xs text-muted-foreground mb-1">Panglima Wilayah</p><p className={cn("font-semibold text-sm", item.status === 'kosong' && 'text-amber-600 italic')}>{item.panglima}</p></div>
                        <div><p className="text-xs text-muted-foreground mb-1">Cakupan</p><p className="text-sm">{item.cakupan}</p></div>
                        <div><p className="text-xs text-muted-foreground mb-1">Catatan</p><p className="text-sm">{item.catatan}</p></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BAB X - REKAPITULASI & ROADMAP ===== */}
      <section id="bab10" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader bab="BAB X" title="Rekapitulasi & Roadmap" subtitle="Status kelengkapan struktur organisasi dan rencana ke depan" badge="Monitoring" badgeColor="#059669" />

          {/* Rekapitulasi */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {REKAPITULASI.map((item, idx) => (
              <motion.div key={idx} variants={scaleIn}>
                <Card className={cn("h-full", item.color === 'green' && 'border-green-200 dark:border-green-800', item.color === 'yellow' && 'border-amber-200 dark:border-amber-800')}>
                  <CardContent className="p-4 text-center">
                    <div className={cn("w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center", item.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30')}>
                      {item.color === 'green' ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Clock className="w-5 h-5 text-amber-600" />}
                    </div>
                    <h4 className="font-bold text-sm mb-1">{item.komponen}</h4>
                    <Badge className={cn("text-xs", item.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800')}>{item.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-2">{item.keterangan}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Roadmap */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#8B0000] to-[#6B0000] text-white">
                <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Roadmap KMN BERDIKARI BERDIKARI</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {ROADMAP.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm", idx < 1 ? 'bg-[#8B0000]' : idx < 2 ? 'bg-[#008F3D]' : 'bg-muted text-muted-foreground')}>
                        {idx < 1 ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1 pb-4 border-b last:border-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm">{item.fase}</h4>
                          <Badge variant="outline" className="text-[10px]">{item.timeline}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="py-16 bg-[#8B0000] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-6">
              Bergabung dengan <span className="text-[#00A847]">KMN BERDIKARI BERDIKARI</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari transformasi ekonomi digital Nusantara. Koperasi Korporasi Multipihak Nusa Berdikari Merah Putih.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#008F3D] hover:bg-[#00A847] text-white px-8 font-semibold">
                Gabung Sekarang <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Lihat Pendaftaran
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
