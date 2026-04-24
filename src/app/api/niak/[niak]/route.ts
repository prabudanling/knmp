/**
 * NIAK Validation API
 * GET /api/niak/[niak] - Validate and get NIAK details
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateNIAK, parseNIAK } from '@/lib/niak';

interface RouteParams {
  params: Promise<{ niak: string }>;
}

// GET - Validate NIAK
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { niak } = await params;

    if (!niak || niak.length !== 16) {
      return NextResponse.json({
        success: false,
        valid: false,
        error: 'NIAK harus 16 digit',
      }, { status: 400 });
    }

    // Validate format with Luhn algorithm
    const isValid = validateNIAK(niak);

    if (!isValid) {
      return NextResponse.json({
        success: true,
        valid: false,
        error: 'NIAK tidak valid (checksum gagal)',
      });
    }

    // Parse NIAK components
    const parsed = parseNIAK(niak);

    // Find user with this NIAK
    const user = await db.user.findUnique({
      where: { niak },
      select: {
        id: true,
        niak: true,
        name: true,
        status: true,
        tier: { select: { code: true, name: true } },
        kpa: { select: { code: true, name: true } },
        joinDate: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        valid: true,
        registered: false,
        parsed,
        message: 'NIAK valid tapi tidak terdaftar dalam sistem',
      });
    }

    return NextResponse.json({
      success: true,
      valid: true,
      registered: true,
      parsed,
      user: {
        id: user.id,
        niak: user.niak,
        name: user.name,
        status: user.status,
        tier: user.tier,
        kpa: user.kpa,
        joinDate: user.joinDate,
        formattedJoinDate: user.joinDate ? new Date(user.joinDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) : null,
      },
    });
  } catch (error) {
    console.error('NIAK validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
