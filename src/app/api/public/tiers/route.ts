/**
 * Public Tiers API Route
 * GET /api/public/tiers - List active tiers
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { successResponse, errorResponse } from '@/lib/utils-server';

export async function GET(request: NextRequest) {
  try {
    const tiers = await db.tier.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        price: true,
        description: true,
        benefits: true,
        hasOperationalRights: true,
      },
    });

    // Parse benefits JSON
    const tiersWithBenefits = tiers.map(tier => ({
      ...tier,
      benefits: tier.benefits ? JSON.parse(tier.benefits) : [],
    }));

    return Response.json(
      successResponse(tiersWithBenefits)
    );
  } catch (error) {
    console.error('List tiers error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
