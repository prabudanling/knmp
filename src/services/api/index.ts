// ============================================
// KOPNUSA API Service Layer
// API-Ready Pattern for Laravel Integration
// ============================================

import type {
  ApiResponse,
  HeroStats,
  KPACategory,
  TierInfo,
  MarketplaceZoneInfo,
  SmartVillageDashboard,
  MemberDashboard,
  SHUBreakdown,
  VillageIntegration,
  LogisticsPartner,
  Course,
  GovernanceStructure,
  Product,
  LogisticsAgent,
  Activity,
} from '@/types';

import {
  HERO_STATS,
  KPA_DATA,
  TIER_DATA,
  MARKETPLACE_ZONES,
  SMART_VILLAGE_DASHBOARD,
  MEMBER_DASHBOARD,
  SHU_BREAKDOWN,
  VILLAGE_INTEGRATION,
  LOGISTICS_PARTNERS,
  COURSES,
  GOVERNANCE_STRUCTURE,
  SAMPLE_PRODUCTS,
  SAMPLE_AGENTS,
  TIMELINE_ACTIVITIES,
  ROADMAP_DATA,
} from '@/data/mocks';

// =====================
// Simulated Delay
// =====================

const simulateDelay = <T>(data: T, delay = 300): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
      });
    }, delay);
  });
};

// =====================
// Home Service
// =====================

export const homeService = {
  getHeroStats: async (): Promise<ApiResponse<HeroStats>> => {
    // TODO: Replace with actual API call
    // return fetch('/api/home/stats').then(res => res.json());
    return simulateDelay(HERO_STATS);
  },

  getKPAData: async (): Promise<ApiResponse<KPACategory[]>> => {
    return simulateDelay(KPA_DATA);
  },

  getTierData: async (): Promise<ApiResponse<TierInfo[]>> => {
    return simulateDelay(TIER_DATA);
  },

  getMarketplaceZones: async (): Promise<ApiResponse<MarketplaceZoneInfo[]>> => {
    return simulateDelay(MARKETPLACE_ZONES);
  },

  getRoadmapData: async (): Promise<ApiResponse<typeof ROADMAP_DATA>> => {
    return simulateDelay(ROADMAP_DATA);
  },
};

// =====================
// Smart Village Service
// =====================

export const smartVillageService = {
  getDashboard: async (): Promise<ApiResponse<SmartVillageDashboard>> => {
    // TODO: Replace with actual API call
    // return fetch('/api/village/stats').then(res => res.json());
    return simulateDelay(SMART_VILLAGE_DASHBOARD);
  },

  getVillageStats: async (province?: string): Promise<ApiResponse<SmartVillageDashboard['villageStats']>> => {
    const data = province
      ? SMART_VILLAGE_DASHBOARD.villageStats.filter(v => v.province === province)
      : SMART_VILLAGE_DASHBOARD.villageStats;
    return simulateDelay(data);
  },

  getCommodityBreakdown: async (): Promise<ApiResponse<SmartVillageDashboard['commodityBreakdown']>> => {
    return simulateDelay(SMART_VILLAGE_DASHBOARD.commodityBreakdown);
  },

  getLogisticsStatus: async (): Promise<ApiResponse<SmartVillageDashboard['logisticsStatus']>> => {
    return simulateDelay(SMART_VILLAGE_DASHBOARD.logisticsStatus);
  },

  getRoadmapProgress: async (): Promise<ApiResponse<SmartVillageDashboard['roadmapProgress']>> => {
    return simulateDelay(SMART_VILLAGE_DASHBOARD.roadmapProgress);
  },
};

// =====================
// Member Service
// =====================

export const memberService = {
  getDashboard: async (memberId?: string): Promise<ApiResponse<MemberDashboard>> => {
    // TODO: Replace with actual API call with auth
    // return fetch(`/api/dashboard/member/${memberId}`).then(res => res.json());
    return simulateDelay(MEMBER_DASHBOARD);
  },

  getTransactions: async (memberId: string, page = 1, limit = 10): Promise<ApiResponse<Activity[]>> => {
    return simulateDelay(TIMELINE_ACTIVITIES, 200);
  },

  getSHUEstimate: async (memberId: string): Promise<ApiResponse<MemberDashboard['shuEstimate']>> => {
    return simulateDelay(MEMBER_DASHBOARD.shuEstimate);
  },

  getTrainingProgress: async (memberId: string): Promise<ApiResponse<MemberDashboard['trainingProgress']>> => {
    return simulateDelay(MEMBER_DASHBOARD.trainingProgress);
  },
};

// =====================
// SHU Service
// =====================

export const shuService = {
  getBreakdown: async (year?: number): Promise<ApiResponse<SHUBreakdown>> => {
    // TODO: Replace with actual API call
    // return fetch(`/api/shu/breakdown?year=${year}`).then(res => res.json());
    return simulateDelay(SHU_BREAKDOWN);
  },

  getMemberDistribution: async (year: number): Promise<ApiResponse<SHUBreakdown['memberDistribution']>> => {
    return simulateDelay(SHU_BREAKDOWN.memberDistribution);
  },
};

// =====================
// Village Integration Service
// =====================

export const villageIntegrationService = {
  getAll: async (): Promise<ApiResponse<VillageIntegration[]>> => {
    // TODO: Replace with actual API call
    // return fetch('/api/village/integration').then(res => res.json());
    return simulateDelay(VILLAGE_INTEGRATION);
  },

  getByTier: async (tier: number): Promise<ApiResponse<VillageIntegration | undefined>> => {
    const data = VILLAGE_INTEGRATION.find(v => v.tier === tier);
    return simulateDelay(data);
  },

  getComponents: async (category?: string): Promise<ApiResponse<VillageIntegration['components']>> => {
    let components: VillageIntegration['components'] = [];
    VILLAGE_INTEGRATION.forEach(v => {
      if (!category || category === 'ALL') {
        components = [...components, ...v.components];
      } else {
        components = [...components, ...v.components.filter(c => c.category === category)];
      }
    });
    return simulateDelay(components);
  },
};

// =====================
// Marketplace Service
// =====================

export const marketplaceService = {
  getZones: async (): Promise<ApiResponse<MarketplaceZoneInfo[]>> => {
    return simulateDelay(MARKETPLACE_ZONES);
  },

  getProducts: async (zone?: string, page = 1, limit = 12): Promise<ApiResponse<Product[]>> => {
    let products = SAMPLE_PRODUCTS;
    if (zone) {
      products = products.filter(p => p.category === zone);
    }
    return simulateDelay(products);
  },

  getProductById: async (productId: string): Promise<ApiResponse<Product | undefined>> => {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    return simulateDelay(product);
  },

  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const products = SAMPLE_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return simulateDelay(products);
  },
};

// =====================
// Logistics Service
// =====================

export const logisticsService = {
  getPartners: async (): Promise<ApiResponse<LogisticsPartner[]>> => {
    return simulateDelay(LOGISTICS_PARTNERS);
  },

  getAgents: async (province?: string): Promise<ApiResponse<LogisticsAgent[]>> => {
    let agents = SAMPLE_AGENTS;
    if (province) {
      agents = agents.filter(a => a.province === province);
    }
    return simulateDelay(agents);
  },

  getAgentById: async (agentId: string): Promise<ApiResponse<LogisticsAgent | undefined>> => {
    const agent = SAMPLE_AGENTS.find(a => a.id === agentId);
    return simulateDelay(agent);
  },

  getCommissionStats: async (agentId: string): Promise<ApiResponse<{ totalCommission: number; totalPackages: number }>> => {
    const agent = SAMPLE_AGENTS.find(a => a.id === agentId);
    return simulateDelay({
      totalCommission: agent?.totalCommission || 0,
      totalPackages: agent?.totalPackages || 0,
    });
  },
};

// =====================
// Academy Service
// =====================

export const academyService = {
  getCourses: async (category?: string): Promise<ApiResponse<Course[]>> => {
    let courses = COURSES;
    if (category) {
      courses = courses.filter(c => c.category === category);
    }
    return simulateDelay(courses);
  },

  getCourseById: async (courseId: string): Promise<ApiResponse<Course | undefined>> => {
    const course = COURSES.find(c => c.id === courseId);
    return simulateDelay(course);
  },

  getEnrolledCourses: async (memberId: string): Promise<ApiResponse<Course[]>> => {
    return simulateDelay(COURSES.slice(0, 3));
  },
};

// =====================
// Governance Service
// =====================

export const governanceService = {
  getStructure: async (): Promise<ApiResponse<GovernanceStructure>> => {
    return simulateDelay(GOVERNANCE_STRUCTURE);
  },

  getOfficials: async (role: keyof GovernanceStructure): Promise<ApiResponse<GovernanceStructure[keyof GovernanceStructure]>> => {
    return simulateDelay(GOVERNANCE_STRUCTURE[role] || []);
  },
};

// =====================
// Activity Service
// =====================

export const activityService = {
  getTimeline: async (): Promise<ApiResponse<Activity[]>> => {
    return simulateDelay(TIMELINE_ACTIVITIES);
  },
};

// =====================
// Config Export for Future API Base URL
// =====================

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  env: process.env.NEXT_PUBLIC_APP_ENV || 'mock',
  isMock: !process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_APP_ENV === 'mock',
};

// =====================
// Generic Fetch Helper (for future Laravel API)
// =====================

export const apiFetch = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  if (API_CONFIG.isMock) {
    console.warn(`[MOCK] API call to ${endpoint} - using mock data`);
    throw new Error('Mock mode - use specific service methods');
  }

  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};
