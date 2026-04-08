/**
 * Tiers API Endpoint
 * GET /api/tiers - Public endpoint to get all active tiers
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const tiers = await db.tier.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: tiers.map(tier => ({
        id: tier.id,
        code: tier.code,
        name: tier.name,
        price: tier.price,
        formattedPrice: formatRupiah(tier.price),
        description: tier.description,
        benefits: JSON.parse(tier.benefits),
        hasOperationalRights: tier.hasOperationalRights,
      })),
    });
  } catch (error) {
    console.error('Error fetching tiers:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data tier' },
      { status: 500 }
    );
  }
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
