/**
 * Admin Announcements API Route
 * GET /api/admin/announcements - List announcements
 * POST /api/admin/announcements - Create announcement
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  paginatedResponse,
  logActivity,
} from '@/lib/utils-server';

// GET - List announcements
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const status = searchParams.get('status') || '';
      const type = searchParams.get('type') || '';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: Record<string, unknown> = {};
      
      if (status) {
        where.status = status;
      }
      
      if (type) {
        where.type = type;
      }

      // Get total count
      const total = await db.announcement.count({ where });

      // Get announcements
      const announcements = await db.announcement.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { pinned: 'desc' },
          { createdAt: 'desc' },
        ],
      });

      return Response.json(
        paginatedResponse(announcements, page, limit, total)
      );
    } catch (error) {
      console.error('List announcements error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}

// POST - Create announcement
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const {
        title,
        content,
        type,
        targetRoles,
        targetKPAs,
        targetTiers,
        image,
        attachment,
        pinned,
        publishNow = true,
        expiresAt,
      } = body;

      // Validate required fields
      if (!title || !content) {
        return Response.json(
          errorResponse('Judul dan konten harus diisi', 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }

      // Create announcement
      const announcement = await db.announcement.create({
        data: {
          title,
          content,
          type: type || 'INFO',
          targetRoles: targetRoles ? JSON.stringify(targetRoles) : null,
          targetKPAs: targetKPAs ? JSON.stringify(targetKPAs) : null,
          targetTiers: targetTiers ? JSON.stringify(targetTiers) : null,
          image,
          attachment,
          pinned: pinned || false,
          status: publishNow ? 'PUBLISHED' : 'DRAFT',
          publishedAt: publishNow ? new Date() : null,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        },
      });

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'CREATE',
        entity: 'Announcement',
        entityId: announcement.id,
        description: `Created announcement: ${title}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      // TODO: Send notifications to targeted users

      return Response.json(
        successResponse(announcement, 'Pengumuman berhasil dibuat')
      );
    } catch (error) {
      console.error('Create announcement error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
