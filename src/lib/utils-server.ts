/**
 * Server-side utility functions for KMNMP
 */

import { db } from './db';
import crypto from 'crypto';

// =====================
// RESPONSE HELPERS
// =====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(
  message: string,
  code?: string,
  details?: unknown
): ApiResponse {
  return {
    success: false,
    error: {
      message,
      code,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
    timestamp: new Date().toISOString(),
  };
}

// =====================
// VALIDATION HELPERS
// =====================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

export function isValidNIK(nik: string): boolean {
  const nikRegex = /^[0-9]{16}$/;
  return nikRegex.test(nik);
}

export function isValidNIAK(niak: string): boolean {
  const niakRegex = /^[0-9]{16}$/;
  return niakRegex.test(niak);
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// =====================
// STRING HELPERS
// =====================

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function generateOrderCode(prefix: string = 'ORD'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generatePaymentCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `PAY-${timestamp}-${random}`;
}

export function generateTransactionCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `TRX-${timestamp}-${random}`;
}

export function generateTicketCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `TKT-${timestamp}-${random}`;
}

export function generateProductCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `PRD-${timestamp}-${random}`;
}

// =====================
// DATE HELPERS
// =====================

export function formatDate(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatShortDate(date: Date | null | undefined): string {
  if (!date) return '-';
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function getMonthName(month: number): string {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return months[month - 1] || '';
}

export function getStartOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getStartOfYear(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function getEndOfYear(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), 11, 31);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function isExpired(date: Date): boolean {
  return new Date() > date;
}

// =====================
// CURRENCY HELPERS
// =====================

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function parseFormattedNumber(str: string): number {
  return parseInt(str.replace(/\D/g, ''), 10) || 0;
}

// =====================
// CACHE HELPERS
// =====================

interface CacheItem<T> {
  value: T;
  expires: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<unknown>>();
  
  set<T>(key: string, value: T, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttlSeconds * 1000,
    });
  }
  
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }
  
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
  
  size(): number {
    return this.cache.size;
  }
}

export const cache = new MemoryCache();

// Cleanup cache every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cache.cleanup(), 5 * 60 * 1000);
}

// =====================
// ACTIVITY LOGGING
// =====================

export interface LogActivityParams {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await db.activityLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        description: params.description,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

// =====================
// NOTIFICATION HELPERS
// =====================

export interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: string;
  link?: string;
}

export async function createNotification(params: CreateNotificationParams): Promise<void> {
  try {
    await db.notification.create({
      data: {
        userId: params.userId,
        title: params.title,
        message: params.message,
        type: params.type,
        link: params.link,
      },
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}

export async function notifyAdmins(params: {
  title: string;
  message: string;
  type: string;
  link?: string;
}): Promise<void> {
  try {
    const admins = await db.user.findMany({
      where: {
        role: { in: ['SUPER_ADMIN', 'ADMIN'] },
        status: 'ACTIVE',
      },
      select: { id: true },
    });
    
    await Promise.all(
      admins.map(admin =>
        createNotification({
          userId: admin.id,
          title: params.title,
          message: params.message,
          type: params.type,
          link: params.link,
        })
      )
    );
  } catch (error) {
    console.error('Failed to notify admins:', error);
  }
}

// =====================
// STATISTICS HELPERS
// =====================

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  totalTransactions: number;
  totalRevenue: number;
  pendingPayments: number;
  totalProducts: number;
  activeProducts: number;
  pendingRegistrations: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const cacheKey = 'dashboard:stats';
  const cached = cache.get<DashboardStats>(cacheKey);
  if (cached) return cached;
  
  const [
    totalMembers,
    activeMembers,
    pendingMembers,
    totalTransactions,
    pendingPayments,
    totalProducts,
    activeProducts,
    pendingRegistrations,
  ] = await Promise.all([
    db.user.count({ where: { role: 'MEMBER' } }),
    db.user.count({ where: { role: 'MEMBER', status: 'ACTIVE' } }),
    db.user.count({ where: { role: 'MEMBER', status: 'PENDING' } }),
    db.transaction.count(),
    db.payment.count({ where: { status: 'PENDING' } }),
    db.product.count(),
    db.product.count({ where: { status: 'ACTIVE' } }),
    db.pendaftaran.count({ where: { status: 'PENDING' } }),
  ]);
  
  // Calculate total revenue from completed transactions
  const revenueResult = await db.transaction.aggregate({
    where: { status: 'COMPLETED', type: 'PURCHASE' },
    _sum: { total: true },
  });
  
  const stats: DashboardStats = {
    totalMembers,
    activeMembers,
    pendingMembers,
    totalTransactions,
    totalRevenue: revenueResult._sum.total || 0,
    pendingPayments,
    totalProducts,
    activeProducts,
    pendingRegistrations,
  };
  
  cache.set(cacheKey, stats, 60); // Cache for 1 minute
  return stats;
}

// =====================
// MEMBER COUNTS BY PERIOD
// =====================

export interface MemberGrowth {
  date: string;
  count: number;
}

export async function getMemberGrowthByMonth(
  year: number = new Date().getFullYear()
): Promise<MemberGrowth[]> {
  const cacheKey = `member:growth:${year}`;
  const cached = cache.get<MemberGrowth[]>(cacheKey);
  if (cached) return cached;
  
  const members = await db.user.findMany({
    where: {
      role: 'MEMBER',
      createdAt: {
        gte: new Date(year, 0, 1),
        lte: new Date(year, 11, 31),
      },
    },
    select: { createdAt: true },
  });
  
  const growthByMonth: Record<string, number> = {};
  
  members.forEach(member => {
    const month = member.createdAt.getMonth() + 1;
    const key = `${year}-${month.toString().padStart(2, '0')}`;
    growthByMonth[key] = (growthByMonth[key] || 0) + 1;
  });
  
  const result: MemberGrowth[] = [];
  for (let month = 1; month <= 12; month++) {
    const key = `${year}-${month.toString().padStart(2, '0')}`;
    result.push({
      date: getMonthName(month),
      count: growthByMonth[key] || 0,
    });
  }
  
  cache.set(cacheKey, result, 300); // Cache for 5 minutes
  return result;
}

// =====================
// GEOGRAPHIC HELPERS
// =====================

export interface GeographicData {
  provinsi: string;
  count: number;
}

export async function getMembersByProvince(): Promise<GeographicData[]> {
  const cacheKey = 'members:by:province';
  const cached = cache.get<GeographicData[]>(cacheKey);
  if (cached) return cached;
  
  const members = await db.user.findMany({
    where: { role: 'MEMBER' },
    select: { provinsi: true },
  });
  
  const byProvince: Record<string, number> = {};
  
  members.forEach(member => {
    const prov = member.provinsi || 'Tidak Diketahui';
    byProvince[prov] = (byProvince[prov] || 0) + 1;
  });
  
  const result = Object.entries(byProvince)
    .map(([provinsi, count]) => ({ provinsi, count }))
    .sort((a, b) => b.count - a.count);
  
  cache.set(cacheKey, result, 300); // Cache for 5 minutes
  return result;
}

// =====================
// KPA & TIER STATS
// =====================

export async function getMembersByKPA(): Promise<{ kpa: string; count: number }[]> {
  const cacheKey = 'members:by:kpa';
  const cached = cache.get<{ kpa: string; count: number }[]>(cacheKey);
  if (cached) return cached;
  
  const members = await db.user.findMany({
    where: { role: 'MEMBER', kpaId: { not: null } },
    include: { kpa: true },
  });
  
  const byKPA: Record<string, number> = {};
  
  members.forEach(member => {
    const kpaName = member.kpa?.name || 'Tidak Terdaftar';
    byKPA[kpaName] = (byKPA[kpaName] || 0) + 1;
  });
  
  const result = Object.entries(byKPA)
    .map(([kpa, count]) => ({ kpa, count }))
    .sort((a, b) => b.count - a.count);
  
  cache.set(cacheKey, result, 300);
  return result;
}

export async function getMembersByTier(): Promise<{ tier: string; count: number }[]> {
  const cacheKey = 'members:by:tier';
  const cached = cache.get<{ tier: string; count: number }[]>(cacheKey);
  if (cached) return cached;
  
  const members = await db.user.findMany({
    where: { role: 'MEMBER', tierId: { not: null } },
    include: { tier: true },
  });
  
  const byTier: Record<string, number> = {};
  
  members.forEach(member => {
    const tierName = member.tier?.name || 'Tidak Terdaftar';
    byTier[tierName] = (byTier[tierName] || 0) + 1;
  });
  
  const result = Object.entries(byTier)
    .map(([tier, count]) => ({ tier, count }))
    .sort((a, b) => b.count - a.count);
  
  cache.set(cacheKey, result, 300);
  return result;
}
