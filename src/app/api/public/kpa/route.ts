/**
 * Public KPA API Route
 * GET /api/public/kpa - List active KPA
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/utils-server';

export async function GET(request: NextRequest) {
  try {
    const kpas = await db.kPA.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        icon: true,
        color: true,
        votingPower: true,
      },
    });

    return Response.json(
      successResponse(kpas)
    );
  } catch (error) {
    console.error('List KPA error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
