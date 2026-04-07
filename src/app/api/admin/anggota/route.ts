/**
 * Admin Anggota API
 * GET /api/admin/anggota - List all members with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth';

// GET - List members
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build filter
    const where: Record<string, unknown> = { role: 'MEMBER' };
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (tier) {
      where.tierId = tier;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { niak: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [total, anggota] = await Promise.all([
      db.user.count({ where }),
      db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tier: { select: { code: true, name: true } },
          kpa: { select: { code: true, name: true } },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: anggota.map(a => ({
        ...a,
        formattedJoinDate: a.joinDate ? new Date(a.joinDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) : null,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get anggota error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
