/**
 * Authentication Helper for KMNMP Admin
 */

import { NextRequest } from 'next/server';
import { db } from './db';
import crypto from 'crypto';

// Session duration in milliseconds (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Simple token store (in production, use Redis or database)
const tokenStore = new Map<string, { userId: string; expiresAt: number }>();

/**
 * Hash password using SHA-256
 */
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Verify password
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Generate secure token
 */
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create session for user
 */
export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = Date.now() + SESSION_DURATION;
  
  tokenStore.set(token, { userId, expiresAt });
  
  return token;
}

/**
 * Verify session token
 */
export async function verifySession(token: string): Promise<{ userId: string } | null> {
  const session = tokenStore.get(token);
  
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    tokenStore.delete(token);
    return null;
  }
  
  return { userId: session.userId };
}

/**
 * Destroy session
 */
export async function destroySession(token: string): Promise<void> {
  tokenStore.delete(token);
}

/**
 * Get current user from request
 */
export async function getCurrentUser(request: NextRequest): Promise<{
  id: string;
  email: string;
  name: string;
  role: string;
} | null> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) return null;
  
  const session = await verifySession(token);
  if (!session) return null;
  
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
    },
  });
  
  if (!user || user.status === 'SUSPENDED') return null;
  
  return user;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: { role: string } | null): boolean {
  return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(user: { role: string } | null): boolean {
  return user?.role === 'SUPER_ADMIN';
}

/**
 * Middleware helper for API routes
 */
export async function withAuth(
  request: NextRequest,
  handler: (user: { id: string; email: string; name: string; role: string }) => Promise<Response>
): Promise<Response> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    return Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return handler(user);
}

/**
 * Admin-only middleware
 */
export async function withAdminAuth(
  request: NextRequest,
  handler: (user: { id: string; email: string; name: string; role: string }) => Promise<Response>
): Promise<Response> {
  const user = await getCurrentUser(request);
  
  if (!user) {
    return Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  if (!isAdmin(user)) {
    return Response.json(
      { success: false, error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }
  
  return handler(user);
}
