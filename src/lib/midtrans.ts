// ============================================
// KMNMP - Midtrans Snap Integration
// ============================================

import snap from 'midtrans-client';
import crypto from 'crypto';

// Initialize Midtrans Snap client
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

export const midtransSnap = new snap.Snap({
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

// Midtrans configuration
export const midtransConfig = {
  isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
  callbackUrl: process.env.MIDTRANS_CALLBACK_URL || `${process.env.NEXTAUTH_URL}/api/midtrans/callback`,
};

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `KMNMP-ORD-${timestamp}${random}`;
}

/**
 * Create Snap transaction parameter
 */
export interface SnapTransactionParams {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemName?: string;
}

/**
 * Create Snap transaction and get token
 */
export async function createSnapTransaction(params: SnapTransactionParams): Promise<{
  success: boolean;
  token?: string;
  redirectUrl?: string;
  orderId?: string;
  error?: string;
}> {
  try {
    const { orderId, amount, customerName, customerEmail, customerPhone, itemName } = params;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customerName,
        email: customerEmail,
        phone: customerPhone || '',
      },
      item_details: [
        {
          id: 'KEANGOTAAN-KMNMP',
          price: amount,
          quantity: 1,
          name: itemName || `Pendaftaran Anggota KMNMP - ${orderId}`,
          brand: 'KMNMP',
          category: 'Keanggotaan',
          merchant_name: 'Koperasi Nusantara Merah Putih',
        },
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pendaftaran/success?order_id=${orderId}`,
        error: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pendaftaran/error?order_id=${orderId}`,
        pending: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pendaftaran/pending?order_id=${orderId}`,
      },
      expiry: {
        start_time: new Date().toISOString().slice(0, 19) + '+07:00',
        unit: 'hour',
        duration: 24, // 24 hours
      },
    };

    const transaction = await midtransSnap.createTransaction(parameter);

    return {
      success: true,
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
      orderId,
    };
  } catch (error) {
    console.error('Midtrans create transaction error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create transaction',
    };
  }
}

/**
 * Verify Midtrans signature key
 */
export function verifySignatureKey(params: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  serverKey: string;
  signatureKey: string;
}): boolean {
  const { orderId, statusCode, grossAmount, serverKey, signatureKey } = params;
  
  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const expectedSignature = crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex');
  
  return signatureKey === expectedSignature;
}

/**
 * Handle Midtrans notification callback
 */
export function handleNotification(notification: any): {
  orderId: string;
  transactionStatus: string;
  paymentType: string;
  transactionId: string;
  fraudStatus?: string;
  vaNumber?: string;
} {
  return {
    orderId: notification.order_id,
    transactionStatus: notification.transaction_status,
    paymentType: notification.payment_type,
    transactionId: notification.transaction_id,
    fraudStatus: notification.fraud_status,
    vaNumber: notification.va_numbers?.[0]?.va_number || notification.permata_va_number,
  };
}

/**
 * Map Midtrans transaction status to our PaymentStatus
 */
export function mapTransactionStatus(
  transactionStatus: string,
  fraudStatus?: string
): 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' | 'REFUNDED' {
  // Handle fraud status first
  if (fraudStatus === 'deny') {
    return 'FAILED';
  }
  
  switch (transactionStatus) {
    case 'capture':
    case 'settlement':
      return 'PAID';
    case 'pending':
      return 'PENDING';
    case 'deny':
    case 'cancel':
    case 'failure':
      return 'FAILED';
    case 'expire':
      return 'EXPIRED';
    case 'refund':
    case 'partial_refund':
    case 'chargeback':
      return 'REFUNDED';
    default:
      return 'PENDING';
  }
}

/**
 * Get payment method name in Indonesian
 */
export function getPaymentMethodName(paymentType: string): string {
  const paymentNames: Record<string, string> = {
    'bank_transfer': 'Transfer Bank',
    'echannel': 'Mandiri Bill Payment',
    'permata': 'Bank Permata',
    'bca': 'Bank BCA',
    'bni': 'Bank BNI',
    'bri': 'Bank BRI',
    'cimb': 'Bank CIMB Niaga',
    'danamon': 'Bank Danamon',
    'other': 'Bank Lainnya',
    'gopay': 'GoPay',
    'shopeepay': 'ShopeePay',
    'qris': 'QRIS',
    'credit_card': 'Kartu Kredit',
    'akulaku': 'Akulaku Paylater',
    'kredivo': 'Kredivo',
    'uob ezpay': 'UOB EZPay',
    'dana': 'DANA',
    'ovo': 'OVO',
  };
  return paymentNames[paymentType] || paymentType;
}
