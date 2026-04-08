/**
 * Role-Based Access Control (RBAC) for KMNMP
 * 
 * Roles hierarchy:
 * SUPER_ADMIN > ADMIN > KORNAS > KORWIL > KORDA > KORCAM > KORDES > KORBID > MEMBER > GUEST
 */

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'KORNAS'   // Presiden / Ketua Umum
  | 'KORWIL'   // Panglima Wilayah
  | 'KORDA'    // Panglima Distrik
  | 'KORCAM'   // Panglima Sektor
  | 'KORDES'   // Komandan Lapangan
  | 'KORBID'   // Koordinator Bidang
  | 'MEMBER'
  | 'GUEST';

export type Permission =
  // Dashboard
  | 'dashboard.view'
  | 'dashboard.admin'
  
  // Members
  | 'members.view'
  | 'members.create'
  | 'members.update'
  | 'members.delete'
  | 'members.approve'
  | 'members.reject'
  | 'members.suspend'
  | 'members.export'
  
  // Pendaftaran
  | 'pendaftaran.view'
  | 'pendaftaran.review'
  | 'pendaftaran.approve'
  | 'pendaftaran.reject'
  
  // Payments
  | 'payments.view'
  | 'payments.create'
  | 'payments.verify'
  | 'payments.reject'
  | 'payments.refund'
  
  // Products
  | 'products.view'
  | 'products.create'
  | 'products.update'
  | 'products.delete'
  | 'products.moderate'
  | 'products.feature'
  
  // Orders
  | 'orders.view'
  | 'orders.create'
  | 'orders.update'
  | 'orders.cancel'
  | 'orders.process'
  
  // SHU
  | 'shu.view'
  | 'shu.configure'
  | 'shu.calculate'
  | 'shu.distribute'
  
  // Reports
  | 'reports.view'
  | 'reports.export'
  | 'reports.financial'
  | 'reports.analytics'
  
  // Settings
  | 'settings.view'
  | 'settings.update'
  
  // Announcements
  | 'announcements.view'
  | 'announcements.create'
  | 'announcements.update'
  | 'announcements.delete'
  
  // Users Management
  | 'users.view'
  | 'users.create'
  | 'users.update'
  | 'users.delete'
  | 'users.impersonate'
  
  // Audit
  | 'audit.view'
  | 'audit.export'
  
  // All permissions
  | '*';

/**
 * Permission map for each role
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: ['*'],
  
  ADMIN: [
    'dashboard.view',
    'dashboard.admin',
    'members.view',
    'members.create',
    'members.update',
    'members.delete',
    'members.approve',
    'members.reject',
    'members.suspend',
    'members.export',
    'pendaftaran.view',
    'pendaftaran.review',
    'pendaftaran.approve',
    'pendaftaran.reject',
    'payments.view',
    'payments.verify',
    'payments.reject',
    'payments.refund',
    'products.view',
    'products.moderate',
    'products.feature',
    'orders.view',
    'orders.process',
    'shu.view',
    'shu.configure',
    'shu.calculate',
    'shu.distribute',
    'reports.view',
    'reports.export',
    'reports.financial',
    'reports.analytics',
    'settings.view',
    'settings.update',
    'announcements.view',
    'announcements.create',
    'announcements.update',
    'announcements.delete',
    'users.view',
    'users.create',
    'users.update',
    'audit.view',
    'audit.export',
  ],
  
  KORNAS: [
    'dashboard.view',
    'dashboard.admin',
    'members.view',
    'members.approve',
    'members.export',
    'pendaftaran.view',
    'pendaftaran.approve',
    'payments.view',
    'shu.view',
    'shu.configure',
    'shu.calculate',
    'shu.distribute',
    'reports.view',
    'reports.export',
    'reports.financial',
    'reports.analytics',
    'announcements.view',
    'announcements.create',
    'announcements.update',
    'users.view',
    'audit.view',
  ],
  
  KORWIL: [
    'dashboard.view',
    'members.view',
    'members.approve',
    'pendaftaran.view',
    'pendaftaran.approve',
    'payments.view',
    'reports.view',
    'announcements.view',
  ],
  
  KORDA: [
    'dashboard.view',
    'members.view',
    'members.create',
    'pendaftaran.view',
    'payments.view',
    'reports.view',
  ],
  
  KORCAM: [
    'dashboard.view',
    'members.view',
    'members.create',
    'pendaftaran.view',
    'payments.view',
  ],
  
  KORDES: [
    'dashboard.view',
    'members.view',
    'members.create',
    'payments.view',
  ],
  
  KORBID: [
    'dashboard.view',
    'reports.view',
  ],
  
  MEMBER: [
    'dashboard.view',
    'members.view',
    'products.view',
    'products.create',
    'products.update',
    'orders.view',
    'orders.create',
    'payments.view',
    'payments.create',
    'shu.view',
    'announcements.view',
  ],
  
  GUEST: [],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes('*') || permissions.includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p));
}

/**
 * Get all permissions for a role
 */
export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Role hierarchy level (higher = more privileged)
 */
export const ROLE_LEVELS: Record<UserRole, number> = {
  SUPER_ADMIN: 100,
  ADMIN: 90,
  KORNAS: 80,
  KORWIL: 70,
  KORDA: 60,
  KORCAM: 50,
  KORDES: 40,
  KORBID: 30,
  MEMBER: 10,
  GUEST: 0,
};

/**
 * Check if role A is higher than or equal to role B
 */
export function isRoleAtLeast(roleA: UserRole, roleB: UserRole): boolean {
  return ROLE_LEVELS[roleA] >= ROLE_LEVELS[roleB];
}

/**
 * Check if user is admin or higher
 */
export function isAdmin(role: UserRole): boolean {
  return isRoleAtLeast(role, 'ADMIN');
}

/**
 * Check if user is KORNAS or higher
 */
export function isKornas(role: UserRole): boolean {
  return isRoleAtLeast(role, 'KORNAS');
}

/**
 * Get role display name in Indonesian
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Administrator',
    KORNAS: 'Ketua Umum / Presiden',
    KORWIL: 'Panglima Wilayah',
    KORDA: 'Panglima Distrik',
    KORCAM: 'Panglima Sektor',
    KORDES: 'Komandan Lapangan',
    KORBID: 'Koordinator Bidang',
    MEMBER: 'Anggota',
    GUEST: 'Tamu',
  };
  return names[role] || role;
}

/**
 * Get all admin roles
 */
export function getAdminRoles(): UserRole[] {
  return ['SUPER_ADMIN', 'ADMIN', 'KORNAS', 'KORWIL', 'KORDA', 'KORCAM', 'KORDES', 'KORBID'];
}

/**
 * Check if role can manage another role
 */
export function canManageRole(managerRole: UserRole, targetRole: UserRole): boolean {
  // SUPER_ADMIN can manage anyone
  if (managerRole === 'SUPER_ADMIN') return true;
  
  // ADMIN can manage anyone below ADMIN
  if (managerRole === 'ADMIN') return ROLE_LEVELS[targetRole] < ROLE_LEVELS.ADMIN;
  
  // KORNAS can manage KORWIL and below
  if (managerRole === 'KORNAS') return ROLE_LEVELS[targetRole] < ROLE_LEVELS.KORNAS;
  
  // Others cannot manage roles
  return false;
}
