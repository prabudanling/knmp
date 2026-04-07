// ============================================
// KOPNUSA Color System - PPP GREEN & MAROON
// WCAG AA/AAA Compliant - High Contrast
// ============================================
//
// PRIMARY: Hijau PPP = #008F3D
// SECONDARY: Merah Tua = #8B0000
// NEUTRAL: Putih, Hitam Lembut, Abu
// ============================================

export const COLORS = {
  // ==========================================
  // PRIMARY - Hijau PPP (#008F3D)
  // For: Hero Titles, Primary Buttons, CTAs
  // ==========================================
  primary: {
    50: '#E8F5E9',   // Lightest - background
    100: '#C8E6C9',  // Light - borders
    200: '#A5D6A7',  // Soft
    300: '#81C784',  // Medium light
    400: '#66BB6A',  // Medium
    500: '#00A847',  // Bright green
    600: '#008F3D',  // PRIMARY - Hijau PPP
    700: '#00752F',  // Darker
    800: '#005F26',  // Dark
    900: '#004D1F',  // Darker
    950: '#003D18',  // Darkest
  },
  
  // ==========================================
  // SECONDARY - Merah Tua (#8B0000)
  // For: Section Titles, Secondary Buttons
  // ==========================================
  secondary: {
    50: '#FFEBEE',   // Lightest - background
    100: '#FFCDD2',  // Light - borders
    200: '#EF9A9A',  // Soft
    300: '#E57373',  // Medium light
    400: '#EF5350',  // Medium
    500: '#DC2626',  // Bright red
    600: '#A50000',  // Brighter maroon
    700: '#8B0000',  // SECONDARY - Merah Tua
    800: '#6B0000',  // Darker
    900: '#500000',  // Dark
    950: '#300000',  // Darkest
  },
  
  // ==========================================
  // NEUTRAL - For Text & Backgrounds
  // ==========================================
  neutral: {
    0: '#FFFFFF',    // Pure white
    50: '#FAFAFA',   // Near white
    100: '#F5F5F5',  // Light gray - background
    200: '#E5E5E5',  // Border gray
    300: '#D4D4D4',  // Medium light
    400: '#A3A3A3',  // Medium gray
    500: '#737373',  // Medium
    600: '#525252',  // Medium dark
    700: '#404040',  // Dark gray
    800: '#262626',  // Darker gray
    900: '#1A1A1A',  // Text - Soft Black
    950: '#0A0A0A',  // Near black
  },
  
  // ==========================================
  // ACCENT - For Special Highlights
  // ==========================================
  accent: {
    50: '#F0FDF4',   // Green tint
    100: '#DCFCE7',  // Light green
    200: '#BBF7D0',  // Soft green
    300: '#86EFAC',  // Medium light
    400: '#4ADE80',  // Medium
    500: '#22C55E',  // Bright green
    600: '#16A34A',  // Darker green
    700: '#15803D',  // Dark green
    800: '#166534',  // Darker
    900: '#14532D',  // Dark
    950: '#052E16',  // Darkest
  },
  
  // ==========================================
  // STATUS COLORS - Semantic
  // ==========================================
  success: '#008F3D',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#3B82F6',
};

// ==========================================
// KPA COLORS - Updated with Green PPP
// ==========================================
export const KPA_COLORS = {
  KPA_1_PRODUCER: '#008F3D',     // Green PPP - Primary
  KPA_2_ENTREPRENEUR: '#3B82F6', // Blue
  KPA_3_COOPERATIVE: '#8B5CF6',  // Purple
  KPA_4_WORKER: '#F59E0B',       // Amber
  KPA_5_CONSUMER: '#EC4899',     // Pink
  KPA_6_INVESTOR: '#8B0000',     // Maroon - Secondary
};

// ==========================================
// ZONE COLORS - Updated with Brand Colors
// ==========================================
export const ZONE_COLORS = {
  AGRI: '#008F3D',        // Green PPP
  RETAIL_UMKM: '#3B82F6', // Blue
  LOGISTICS: '#F59E0B',   // Amber
  DIGITAL: '#8B5CF6',     // Purple
  HEALTH: '#EF4444',      // Red
  SPIRITUAL: '#06B6D4',   // Cyan
  EXPORT: '#8B0000',      // Maroon
  ENERGY: '#F97316',      // Orange
};

// ==========================================
// BRAND COLORS - Quick Access
// ==========================================
export const BRAND = {
  GREEN: '#008F3D',           // Primary - Hijau PPP
  GREEN_LIGHT: '#00A847',     // Lighter green
  GREEN_DARK: '#00752F',      // Darker green
  GREEN_BG: '#E8F5E9',        // Background green
  
  MAROON: '#8B0000',          // Secondary - Merah Tua
  MAROON_LIGHT: '#A50000',    // Lighter maroon
  MAROON_DARK: '#6B0000',     // Darker maroon
  MAROON_BG: '#FFEBEE',       // Background maroon
  
  WHITE: '#FFFFFF',           // White
  TEXT: '#1A1A1A',            // Text - Soft Black
  BACKGROUND: '#F5F5F5',      // Background - Light Gray
  BORDER: '#E5E7EB',          // Border gray
};

// ==========================================
// TEXT COLOR UTILITIES
// ==========================================
export const TEXT_COLORS = {
  // High contrast text on white background
  ON_WHITE: '#1A1A1A',
  ON_LIGHT: '#1A1A1A',
  ON_LIGHT_GREEN: '#00752F',
  ON_LIGHT_MAROON: '#6B0000',
  
  // White text on colored backgrounds
  ON_GREEN: '#FFFFFF',
  ON_MAROON: '#FFFFFF',
  ON_DARK: '#FFFFFF',
};

// ==========================================
// BACKGROUND COLORS
// ==========================================
export const BG_COLORS = {
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#F5F5F5',
  LIGHT_GREEN: '#E8F5E9',
  LIGHT_MAROON: '#FFEBEE',
  GREEN: '#008F3D',
  MAROON: '#8B0000',
  DARK: '#0F1419',
};

// ==========================================
// BUTTON COLORS
// ==========================================
export const BUTTON_COLORS = {
  PRIMARY: {
    BG: '#008F3D',
    BG_HOVER: '#00752F',
    TEXT: '#FFFFFF',
  },
  SECONDARY: {
    BG: '#8B0000',
    BG_HOVER: '#6B0000',
    TEXT: '#FFFFFF',
  },
  OUTLINE_GREEN: {
    BORDER: '#008F3D',
    TEXT: '#008F3D',
    BG_HOVER: '#008F3D',
    TEXT_HOVER: '#FFFFFF',
  },
  OUTLINE_MAROON: {
    BORDER: '#8B0000',
    TEXT: '#8B0000',
    BG_HOVER: '#8B0000',
    TEXT_HOVER: '#FFFFFF',
  },
};
