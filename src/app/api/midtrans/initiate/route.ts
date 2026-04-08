// ============================================
// API: Midtrans - Initiate Payment
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createSnapTransaction, generateOrderId } from '@/lib/midtrans';
import { z } from 'zod';

const initiateSchema = z.object({
  pendaftaran_id: z.string().optional(),
  no_registrasi: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = initiateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Data tidak valid' },
        { status: 400 }
      );
    }

    const { pendaftaran_id, no_registrasi } = validationResult.data;

    // Find pendaftaran
    let pendaftaran;
    if (pendaftaran_id) {
      pendaftaran = await db.pendaftaran.findUnique({
        where: { id: pendaftaran_id },
        include: { tier: true },
      });
    } else if (no_registrasi) {
      pendaftaran = await db.pendaftaran.findUnique({
        where: { no_registrasi },
        include: { tier: true },
      });
    }

    if (!pendaftaran) {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran tidak ditemukan' },
        { status: 404 }
      );
    }

    // Check if already paid
    if (pendaftaran.status === 'SUDAH_BAYAR') {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran sudah dibayar' },
        { status: 400 }
      );
    }

    // Check if rejected
    if (pendaftaran.status === 'DITOLAK') {
      return NextResponse.json(
        { success: false, error: 'Pendaftaran ditolak' },
        { status: 400 }
      );
    }

    // Calculate amount
    const amount = pendaftaran.tier.promo_aktif
      ? pendaftaran.tier.harga_promo
      : pendaftaran.tier.harga_normal;

    if (amount === 0) {
      // Free tier - mark as paid directly
      await db.pendaftaran.update({
        where: { id: pendaftaran.id },
        data: { status: 'DISETUJUI' },
      });

      return NextResponse.json({
        success: true,
        data: {
          free: true,
          message: 'Tier gratis, tidak memerlukan pembayaran',
        },
      });
    }

    // Check for existing pending payment
    const existingPayment = await db.payment.findFirst({
      where: {
        pendaftaran_id: pendaftaran.id,
        status: 'PENDING',
      },
    });

    if (existingPayment && existingPayment.snap_token) {
      return NextResponse.json({
        success: true,
        data: {
          order_id: existingPayment.order_id,
          snap_token: existingPayment.snap_token,
          snap_redirect_url: existingPayment.snap_redirect_url,
          amount: existingPayment.amount,
        },
      });
    }

    // Generate new order ID
    const orderId = generateOrderId();

    // Create Midtrans transaction
    const midtransResult = await createSnapTransaction({
      orderId,
      amount,
      customerName: pendaftaran.nama_lengkap,
      customerEmail: pendaftaran.email,
      customerPhone: pendaftaran.no_hp,
      itemName: `Pendaftaran ${pendaftaran.tier.nama_tier}`,
    });

    if (!midtransResult.success) {
      return NextResponse.json(
        { success: false, error: midtransResult.error },
        { status: 500 }
      );
    }

    // Save payment to database
    const payment = await db.payment.create({
      data: {
        order_id: orderId,
        pendaftaran_id: pendaftaran.id,
        amount,
        snap_token: midtransResult.token,
        snap_redirect_url: midtransResult.redirectUrl,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        order_id: payment.order_id,
        snap_token: payment.snap_token,
        snap_redirect_url: payment.snap_redirect_url,
        amount: payment.amount,
      },
    });
  } catch (error) {
    console.error('Midtrans initiate error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat membuat transaksi' },
      { status: 500 }
    );
  }
}
