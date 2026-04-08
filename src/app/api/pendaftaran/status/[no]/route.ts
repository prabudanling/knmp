// ============================================
// API: Pendaftaran Status - Check registration status
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ no: string }> }
) {
  try {
    const { no } = await params;
    const no_registrasi = decodeURIComponent(no);

    const pendaftaran = await db.pendaftaran.findUnique({
      where: { no_registrasi },
      include: {
        tier: {
          select: {
            nama_tier: true,
            kode_tier: true,
            harga_normal: true,
            harga_promo: true,
            promo_aktif: true,
          },
        },
      },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    // Get payment info if exists
    const payment = await db.payment.findFirst({
      where: { pendaftaran_id: pendaftaran.id },
      orderBy: { created_at: 'desc' },
    });

    const harga = pendaftaran.tier.promo_aktif
      ? pendaftaran.tier.harga_promo
      : pendaftaran.tier.harga_normal;

    return NextResponse.json({
      success: true,
      data: {
        no_registrasi: pendaftaran.no_registrasi,
        nama_lengkap: pendaftaran.nama_lengkap,
        email: pendaftaran.email,
        tier: {
          nama: pendaftaran.tier.nama_tier,
          kode: pendaftaran.tier.kode_tier,
        },
        status: pendaftaran.status,
        harga,
        catatan_reviewer: pendaftaran.catatan_reviewer,
        created_at: pendaftaran.created_at,
        reviewed_at: pendaftaran.reviewed_at,
        payment: payment
          ? {
              order_id: payment.order_id,
              amount: payment.amount,
              status: payment.status,
              snap_token: payment.snap_token,
              snap_redirect_url: payment.snap_redirect_url,
              payment_type: payment.payment_type,
              va_number: payment.va_number,
              paid_at: payment.paid_at,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Check status error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat mengecek status' },
      { status: 500 }
    );
  }
}
