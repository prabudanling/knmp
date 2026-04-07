// ============================================
// API: Midtrans - Payment Callback/Webhook
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  handleNotification,
  mapTransactionStatus,
  verifySignatureKey,
  getPaymentMethodName,
} from '@/lib/midtrans';
import { sendPembayaranBerhasilEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json();

    console.log('Midtrans notification received:', JSON.stringify(notification, null, 2));

    // Extract notification data
    const {
      order_id,
      transaction_status,
      payment_type,
      transaction_id,
      fraud_status,
      va_numbers,
      permata_va_number,
      gross_amount,
      signature_key,
      status_code,
    } = notification;

    // Verify signature key
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const isValidSignature = verifySignatureKey({
      orderId: order_id,
      statusCode: status_code,
      grossAmount: gross_amount,
      serverKey,
      signatureKey: signature_key,
    });

    if (!isValidSignature) {
      console.error('Invalid signature key for order:', order_id);
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Find payment
    const payment = await db.payment.findFirst({
      where: {
        OR: [
          { order_id },
          { midtrans_order_id: order_id },
        ],
      },
      include: {
        pendaftaran: {
          include: { tier: true },
        },
      },
    });

    if (!payment) {
      console.error('Payment not found for order:', order_id);
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Map transaction status
    const paymentStatus = mapTransactionStatus(transaction_status, fraud_status);

    // Get VA number
    const vaNumber = va_numbers?.[0]?.va_number || permata_va_number;

    // Update payment
    await db.payment.update({
      where: { id: payment.id },
      data: {
        midtrans_order_id: order_id,
        transaction_id,
        transaction_status,
        payment_type,
        va_number: vaNumber,
        fraud_status,
        status: paymentStatus,
        paid_at: paymentStatus === 'PAID' ? new Date() : null,
      },
    });

    // If payment successful, update pendaftaran status
    if (paymentStatus === 'PAID' && payment.pendaftaran) {
      await db.pendaftaran.update({
        where: { id: payment.pendaftaran_id! },
        data: { status: 'SUDAH_BAYAR' },
      });

      // Update tier terisi count
      await db.tier.update({
        where: { id: payment.pendaftaran.tier_id },
        data: { terisi: { increment: 1 } },
      });

      // Send success email
      const paymentMethodName = getPaymentMethodName(payment_type);
      sendPembayaranBerhasilEmail({
        email: payment.pendaftaran.email,
        namaLengkap: payment.pendaftaran.nama_lengkap,
        noRegistrasi: payment.pendaftaran.no_registrasi,
        tierNama: payment.pendaftaran.tier.nama_tier,
        amount: payment.amount,
        paymentType: paymentMethodName,
      }).catch((err) => console.error('Failed to send payment email:', err));
    }

    // Log the notification
    console.log(`Payment ${order_id} updated: ${transaction_status} -> ${paymentStatus}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Midtrans callback error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
