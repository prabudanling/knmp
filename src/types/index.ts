// ============================================
// KOPNUSA/KNMP Type Definitions
// API-Ready Pattern for Laravel Integration
// ============================================

// =====================
// Core Entity Types
// =====================

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  kpa: KPAType;
  tier: MemberTier;
  status: MemberStatus;
  joinDate: string;
  avatar?: string;
  village?: string;
  district?: string;
  province?: string;
}

export interface Village {
  id: string;
  name: string;
  code: string;
  district: string;
  regency: string;
  province: string;
  memberCount: number;
  integratedComponents: number;
  productionValue: number;
  status: VillageStatus;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MarketplaceZone;
  sellerId: string;
  sellerName: string;
  village: string;
  province: string;
  images: string[];
  certification: string[];
  stock: number;
  rating: number;
  sold: number;
}

export interface Transaction {
  id: string;
  memberId: string;
  productId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  type: TransactionType;
}

// =====================
// KPA (Kelompok Pihak Anggota)
// =====================

export type KPAType = 
  | 'KPA_1_PRODUCER'
  | 'KPA_2_ENTREPRENEUR'
  | 'KPA_3_COOPERATIVE'
  | 'KPA_4_WORKER'
  | 'KPA_5_CONSUMER'
  | 'KPA_6_INVESTOR';

export interface KPACategory {
  id: KPAType;
  name: string;
  description: string;
  icon: string;
  color: string;
  votingPower: number;
  memberCount: number;
}

// =====================
// Member Tiers
// =====================

export type MemberTier = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7';

export interface TierInfo {
  tier: MemberTier;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  hasOperationalRights: boolean;
}

// =====================
// Status Enums
// =====================

export type MemberStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE';
export type VillageStatus = 'INTEGRATED' | 'ONBOARDING' | 'PENDING' | 'INACTIVE';
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
export type TransactionType = 'PURCHASE' | 'SALE' | 'COMMISSION' | 'SHU';

// =====================
// Marketplace Zones
// =====================

export type MarketplaceZone = 
  | 'AGRI'
  | 'RETAIL_UMKM'
  | 'LOGISTICS'
  | 'DIGITAL'
  | 'HEALTH'
  | 'SPIRITUAL'
  | 'EXPORT'
  | 'ENERGY';

export interface MarketplaceZoneInfo {
  id: MarketplaceZone;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  topCategories: string[];
}

// =====================
// Dashboard Types
// =====================

export interface MemberDashboard {
  member: Member;
  greeting: string;
  membershipStatus: {
    tier: MemberTier;
    joinDate: string;
    status: MemberStatus;
    simpananPokok: number;
    simpananWajib: number;
    simpananSukarela: number;
  };
  transactionSummary: {
    totalTransactions: number;
    totalVolume: number;
    thisMonth: number;
    growth: number;
  };
  logisticsCommission: {
    totalPackages: number;
    totalCommission: number;
    thisMonth: number;
  };
  shuEstimate: {
    jasaUsaha: number;
    jasaModal: number;
    total: number;
  };
  trainingProgress: {
    completed: number;
    total: number;
    currentCourse: string;
  };
  recentActivity: Activity[];
  quickActions: QuickAction[];
}

export interface SmartVillageDashboard {
  summary: {
    totalVillages: number;
    totalMembers: number;
    integratedComponents: number;
    productionValue: number;
    activeAgents: number;
    transactionVolume: number;
  };
  villageStats: VillageStats[];
  commodityBreakdown: CommodityStats[];
  logisticsStatus: LogisticsStats;
  roadmapProgress: RoadmapProgress[];
  heatmapData: HeatmapPoint[];
}

export interface VillageStats {
  province: string;
  villageCount: number;
  memberCount: number;
  productionValue: number;
  growth: number;
}

export interface CommodityStats {
  name: string;
  volume: number;
  value: number;
  growth: number;
  icon: string;
}

export interface LogisticsStats {
  totalPackages: number;
  deliveredPackages: number;
  activeAgents: number;
  averageDeliveryTime: number;
  commission: number;
}

export interface RoadmapProgress {
  phase: string;
  year: string;
  target: string;
  progress: number;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
}

export interface HeatmapPoint {
  province: string;
  lat: number;
  lng: number;
  intensity: number;
  villageCount: number;
}

// =====================
// Activity & Actions
// =====================

export interface Activity {
  id: string;
  type: 'TRANSACTION' | 'TRAINING' | 'COMMISSION' | 'SHU' | 'MEMBERSHIP';
  title: string;
  description: string;
  amount?: number;
  timestamp: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  href: string;
  color: string;
}

// =====================
// SHU (Sisa Hasil Usaha)
// =====================

export interface SHUBreakdown {
  year: number;
  totalSHU: number;
  breakdown: {
    danaCadangan: number;
    jasaModal: number;
    jasaUsaha: number;
    danaPengurus: number;
    danaPendidikan: number;
    danaSosial: number;
    danaTeknologi: number;
  };
  memberDistribution: SHUMemberDistribution[];
}

export interface SHUMemberDistribution {
  kpa: KPAType;
  totalJasaUsaha: number;
  totalJasaModal: number;
  memberCount: number;
}

// =====================
// RAT & Governance
// =====================

export interface RATInfo {
  id: string;
  year: number;
  date: string;
  type: 'ANNUAL' | 'EXTRAORDINARY';
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  agenda: string[];
  attendees: number;
  decisions: RATDecision[];
}

export interface RATDecision {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
}

export interface GovernanceStructure {
  pengurus: Official[];
  pengawas: Official[];
  dewanPenasihat: Official[];
  dewanEtik: Official[];
  ombudsman: Official[];
}

export interface Official {
  id: string;
  name: string;
  position: string;
  photo?: string;
  bio?: string;
  termStart: string;
  termEnd: string;
}

// =====================
// Village Integration
// =====================

export interface VillageIntegration {
  tier: number;
  name: string;
  components: VillageComponent[];
}

export interface VillageComponent {
  id: string;
  name: string;
  abbreviation: string;
  category: 'LKD' | 'BADAN' | 'KADER' | 'PROGRAM' | 'SYSTEM' | 'INFRASTRUCTURE';
  description: string;
  digitalStatus: 'MANUAL' | 'PARTIAL' | 'DIGITAL';
  integrationPriority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  icon: string;
}

// =====================
// Logistics
// =====================

export interface LogisticsAgent {
  id: string;
  name: string;
  village: string;
  province: string;
  partnerExpeditions: string[];
  totalPackages: number;
  totalCommission: number;
  rating: number;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
}

export interface LogisticsPartner {
  id: string;
  name: string;
  logo: string;
  type: 'EXPRESS' | 'CARGO' | 'POS';
  commissionRate: number;
  coverage: string[];
}

// =====================
// Academy / Training
// =====================

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  duration: number;
  modules: number;
  enrolled: number;
  rating: number;
  thumbnail: string;
  category: string;
}

export interface CourseProgress {
  courseId: string;
  progress: number;
  completed: boolean;
  certificate: string | null;
}

// =====================
// API Response Types
// =====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// =====================
// Stats Types
// =====================

export interface HeroStats {
  villages: number;
  members: number;
  provinces: number;
  transactionValue: number;
  exportVolume: number;
  agents: number;
}

export interface CounterStats {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  icon: string;
}
