/**
 * NIAK Generator - 16 Digit dengan Luhn Algorithm
 * 
 * Format: PP KK KPA T YY MM NNNNN C
 * - PP (2 digit): Provinsi code (00 untuk nasional)
 * - KK (2 digit): Kabupaten/Kota code (00 untuk level provinsi+)
 * - KPA (1 digit): Klasifikasi Pihak Anggota (1-6)
 * - T (1 digit): Tier (1-7)
 * - YY (2 digit): Tahun (26 untuk 2026)
 * - MM (2 digit): Bulan (01-12)
 * - NNNNN (5 digit): Sequence number
 * - C (1 digit): Luhn check digit
 */

import { db } from './db';

const KPA_CODES: Record<string, string> = {
  'KPA_1_PRODUCER': '1',
  'KPA_2_ENTREPRENEUR': '2',
  'KPA_3_COOPERATIVE': '3',
  'KPA_4_WORKER': '4',
  'KPA_5_CONSUMER': '5',
  'KPA_6_INVESTOR': '6',
};

const TIER_CODES: Record<string, string> = {
  'T1': '1',
  'T2': '2',
  'T3': '3',
  'T4': '4',
  'T5': '5',
  'T6': '6',
  'T7': '7',
};

/**
 * Calculate Luhn check digit
 */
function calculateLuhnCheckDigit(numberStr: string): string {
  const digits = numberStr.split('').map(Number);
  let sum = 0;
  const isOddPosition = (i: number) => (numberStr.length - i) % 2 === 0;
  
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (isOddPosition(i)) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  
  return ((10 - (sum % 10)) % 10).toString();
}

/**
 * Validate NIAK with Luhn algorithm
 */
export function validateNIAK(niak: string): boolean {
  if (!niak || niak.length !== 16) return false;
  
  const checkDigit = niak.slice(-1);
  const numberPart = niak.slice(0, -1);
  const calculatedCheck = calculateLuhnCheckDigit(numberPart);
  
  return checkDigit === calculatedCheck;
}

/**
 * Parse NIAK components
 */
export function parseNIAK(niak: string): {
  provinsi: string;
  kabKota: string;
  kpa: string;
  tier: string;
  year: string;
  month: string;
  sequence: string;
  checkDigit: string;
  isValid: boolean;
} | null {
  if (!niak || niak.length !== 16) return null;
  
  return {
    provinsi: niak.slice(0, 2),
    kabKota: niak.slice(2, 4),
    kpa: niak.slice(4, 5),
    tier: niak.slice(5, 6),
    year: niak.slice(6, 8),
    month: niak.slice(8, 10),
    sequence: niak.slice(10, 15),
    checkDigit: niak.slice(15),
    isValid: validateNIAK(niak),
  };
}

/**
 * Generate NIAK for a new member
 */
export async function generateNIAK(params: {
  provinsi: string; // 2 digit code
  kabKota: string;  // 2 digit code
  kpaCode: string;  // KPA_X_XXXXX format
  tierCode: string; // TX format
}): Promise<string> {
  const { provinsi, kabKota, kpaCode, tierCode } = params;
  
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Get or create sequence
  const sequenceRecord = await db.nIAKSequence.upsert({
    where: { year: now.getFullYear() },
    update: { lastSequence: { increment: 1 } },
    create: {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      lastSequence: 1,
    },
  });
  
  const sequence = sequenceRecord.lastSequence.toString().padStart(5, '0');
  const kpaDigit = KPA_CODES[kpaCode] || '1';
  const tierDigit = TIER_CODES[tierCode] || '1';
  
  // Build NIAK without check digit: PP KK K T YY MM NNNNN
  const niakWithoutCheck = `${provinsi.padStart(2, '0')}${kabKota.padStart(2, '0')}${kpaDigit}${tierDigit}${year}${month}${sequence}`;
  
  // Calculate check digit
  const checkDigit = calculateLuhnCheckDigit(niakWithoutCheck);
  
  return niakWithoutCheck + checkDigit;
}

/**
 * Get next sequence number for preview (without incrementing)
 */
export async function getNextSequence(year: number): Promise<number> {
  const record = await db.nIAKSequence.findUnique({
    where: { year },
  });
  return (record?.lastSequence || 0) + 1;
}
