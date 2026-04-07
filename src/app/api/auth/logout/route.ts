/**
 * Logout API Route
 * POST /api/auth/logout
 */

import { NextRequest } from 'next/server';
import { getCurrentUser, destroySession } from '@/lib/auth';
import { successResponse, errorResponse, logActivity } from '@/lib/utils-server';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (user) {
      // Get token from header
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.replace('Bearer ', '');
      
      if (token) {
        await destroySession(token);
      }
      
      // Log activity
      await logActivity({
        userId: user.id,
        action: 'LOGOUT',
        entity: 'User',
        entityId: user.id,
        description: `User ${user.email} logged out`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });
    }
    
    return Response.json(
      successResponse(null, 'Logout berhasil')
    );
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
