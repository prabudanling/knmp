// ============================================
// API: Admin Activity Logs
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin auth
    const user = await getCurrentUser(request);
    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action');
    const entity = searchParams.get('entity');
    const userId = searchParams.get('userId');

    // Build where clause
    const where: Record<string, unknown> = {};
    if (action) {
      where.action = { contains: action };
    }
    if (entity) {
      where.entity = entity;
    }
    if (userId) {
      where.userId = userId;
    }

    const [total, logs] = await Promise.all([
      db.activityLog.count({ where }),
      db.activityLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: logs.map((log) => ({
        id: log.id,
        action: log.action,
        entity: log.entity,
        entityId: log.entityId,
        description: log.description,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        metadata: log.metadata ? JSON.parse(log.metadata) : null,
        createdAt: log.createdAt,
        user: log.user,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get activity logs error:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil log aktivitas' },
      { status: 500 }
    );
  }
}
