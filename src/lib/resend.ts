// ============================================
// KMNMP - Email Service via Resend
// ============================================

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@kopnusa.id';
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://kopnusa.id';

// ============================================
// EMAIL TEMPLATES
// ============================================

/**
 * Email Template 1: Pendaftaran Diterima
 */
export function generatePendaftaranDiterimaEmail(params: {
  namaLengkap: string;
  noRegistrasi: string;
  tierNama: string;
  harga: number;
}): { subject: string; html: string; text: string } {
  const { namaLengkap, noRegistrasi, tierNama, harga } = params;
  const hargaFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(harga);

  return {
    subject: `Pendaftaran KMNMP Diterima - ${noRegistrasi}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Pendaftaran Diterima</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8B0000 0%, #008F3D 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🎉 Pendaftaran Diterima!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Yth. <strong>${namaLengkap}</strong>,</p>
            <p>Selamat! Pendaftaran Anda sebagai anggota <strong>Koperasi Nusantara Merah Putih (KMNMP)</strong> telah diterima.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #008F3D;">
              <h3 style="margin-top: 0; color: #8B0000;">Detail Pendaftaran</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>No. Registrasi</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${noRegistrasi}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tier Keanggotaan</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${tierNama}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Biaya Pendaftaran</strong></td>
                  <td style="padding: 8px 0; color: #008F3D; font-weight: bold;">${hargaFormatted}</td>
                </tr>
              </table>
            </div>
            
            <p>Silakan lakukan pembayaran untuk menyelesaikan proses pendaftaran Anda.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${FRONTEND_URL}/pendaftaran/payment/${noRegistrasi}" 
                 style="background: #008F3D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Bayar Sekarang
              </a>
            </div>
            
            <p style="font-size: 12px; color: #666; text-align: center;">
              Jika tombol di atas tidak berfungsi, salin link berikut ke browser Anda:<br>
              ${FRONTEND_URL}/pendaftaran/payment/${noRegistrasi}
            </p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2026 Koperasi Nusantara Merah Putih (KMNMP)</p>
            <p>Email: info@kopnusa.id | WA: +62 812-3456-7890</p>
          </div>
        </body>
      </html>
    `,
    text: `
Yth. ${namaLengkap},

Selamat! Pendaftaran Anda sebagai anggota Koperasi Nusantara Merah Putih (KMNMP) telah diterima.

Detail Pendaftaran:
- No. Registrasi: ${noRegistrasi}
- Tier Keanggotaan: ${tierNama}
- Biaya Pendaftaran: ${hargaFormatted}

Silakan lakukan pembayaran untuk menyelesaikan proses pendaftaran Anda.

Link Pembayaran: ${FRONTEND_URL}/pendaftaran/payment/${noRegistrasi}

© 2026 Koperasi Nusantara Merah Putih (KMNMP)
    `.trim(),
  };
}

/**
 * Email Template 2: Pembayaran Berhasil
 */
export function generatePembayaranBerhasilEmail(params: {
  namaLengkap: string;
  noRegistrasi: string;
  tierNama: string;
  amount: number;
  paymentType: string;
}): { subject: string; html: string; text: string } {
  const { namaLengkap, noRegistrasi, tierNama, amount, paymentType } = params;
  const hargaFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  return {
    subject: `Pembayaran KMNMP Berhasil - ${noRegistrasi}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Pembayaran Berhasil</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #008F3D 0%, #22c55e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">✅ Pembayaran Berhasil!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Yth. <strong>${namaLengkap}</strong>,</p>
            <p>Pembayaran Anda telah berhasil dikonfirmasi!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #008F3D;">
              <h3 style="margin-top: 0; color: #008F3D;">Detail Pembayaran</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>No. Registrasi</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${noRegistrasi}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tier Keanggotaan</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${tierNama}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Metode Pembayaran</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${paymentType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Jumlah Bayar</strong></td>
                  <td style="padding: 8px 0; color: #008F3D; font-weight: bold;">${hargaFormatted}</td>
                </tr>
              </table>
            </div>
            
            <p>Tim admin kami sedang memproses keanggotaan Anda. NIAK (Nomor Induk Anggota Koperasi) akan dikirimkan melalui email setelah proses verifikasi selesai.</p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2026 Koperasi Nusantara Merah Putih (KMNMP)</p>
          </div>
        </body>
      </html>
    `,
    text: `
Yth. ${namaLengkap},

Pembayaran Anda telah berhasil dikonfirmasi!

Detail Pembayaran:
- No. Registrasi: ${noRegistrasi}
- Tier Keanggotaan: ${tierNama}
- Metode Pembayaran: ${paymentType}
- Jumlah Bayar: ${hargaFormatted}

Tim admin kami sedang memproses keanggotaan Anda. NIAK akan dikirimkan melalui email setelah proses verifikasi selesai.

© 2026 Koperasi Nusantara Merah Putih (KMNMP)
    `.trim(),
  };
}

/**
 * Email Template 3: APPROVE + NIAK
 */
export function generateApproveEmail(params: {
  namaLengkap: string;
  niak: string;
  tierNama: string;
}): { subject: string; html: string; text: string } {
  const { namaLengkap, niak, tierNama } = params;
  const niakFormatted = `${niak.slice(0, 4)} ${niak.slice(4, 6)} ${niak.slice(6, 8)} ${niak.slice(8, 10)} ${niak.slice(10, 15)} ${niak[15]}`;

  return {
    subject: `🎉 Selamat! Anda Resmi Anggota KMNMP - NIAK: ${niakFormatted}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Keanggotaan Disetujui</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8B0000 0%, #008F3D 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🎊 Selamat!</h1>
            <p style="color: white; margin: 10px 0 0 0;">Anda Resmi Menjadi Anggota KMNMP</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Yth. <strong>${namaLengkap}</strong>,</p>
            <p>Selamat! Anda telah resmi menjadi anggota <strong>Koperasi Nusantara Merah Putih (KMNMP)</strong>.</p>
            
            <div style="background: white; padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #008F3D;">
              <p style="margin: 0; color: #666; font-size: 12px;">Nomor Induk Anggota Koperasi</p>
              <h2 style="margin: 10px 0; color: #8B0000; font-size: 24px; letter-spacing: 2px;">${niakFormatted}</h2>
              <p style="margin: 0; color: #008F3D; font-weight: bold;">${tierNama}</p>
            </div>
            
            <p><strong>NIAK</strong> adalah nomor identitas unik Anda sebagai anggota koperasi. Simpan nomor ini baik-baik untuk:</p>
            <ul>
              <li>Login ke dashboard anggota</li>
              <li>Transaksi di marketplace KMNMP</li>
              <li>Mengikuti RAT (Rapat Anggota Tahunan)</li>
              <li>Mendapatkan layanan koperasi lainnya</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${FRONTEND_URL}/login" 
                 style="background: #8B0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Login ke Dashboard
              </a>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2026 Koperasi Nusantara Merah Putih (KMNMP)</p>
          </div>
        </body>
      </html>
    `,
    text: `
Yth. ${namaLengkap},

Selamat! Anda telah resmi menjadi anggota Koperasi Nusantara Merah Putih (KMNMP).

NOMOR INDUK ANGGOTA KOPERASI (NIAK): ${niakFormatted}
Tier Keanggotaan: ${tierNama}

NIAK adalah nomor identitas unik Anda sebagai anggota koperasi. Simpan nomor ini baik-baik untuk:
- Login ke dashboard anggota
- Transaksi di marketplace KMNMP
- Mengikuti RAT (Rapat Anggota Tahunan)
- Mendapatkan layanan koperasi lainnya

Login ke Dashboard: ${FRONTEND_URL}/login

© 2026 Koperasi Nusantara Merah Putih (KMNMP)
    `.trim(),
  };
}

/**
 * Email Template 4: REJECT + Alasan
 */
export function generateRejectEmail(params: {
  namaLengkap: string;
  noRegistrasi: string;
  alasan: string;
}): { subject: string; html: string; text: string } {
  const { namaLengkap, noRegistrasi, alasan } = params;

  return {
    subject: `Pendaftaran KMNMP Ditolak - ${noRegistrasi}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Pendaftaran Ditolak</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #8B0000; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">Pendaftaran Ditolak</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Yth. <strong>${namaLengkap}</strong>,</p>
            <p>Mohon maaf, pendaftaran Anda sebagai anggota Koperasi Nusantara Merah Putih (KMNMP) tidak dapat disetujui.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B0000;">
              <h3 style="margin-top: 0; color: #8B0000;">Alasan Penolakan</h3>
              <p style="margin-bottom: 0;">${alasan}</p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Catatan:</strong> Anda dapat mendaftar kembali setelah memperbaiki data sesuai alasan penolakan di atas.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${FRONTEND_URL}/pendaftaran" 
                 style="background: #008F3D; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Daftar Ulang
              </a>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2026 Koperasi Nusantara Merah Putih (KMNMP)</p>
            <p>Email: info@kopnusa.id | WA: +62 812-3456-7890</p>
          </div>
        </body>
      </html>
    `,
    text: `
Yth. ${namaLengkap},

Mohon maaf, pendaftaran Anda sebagai anggota Koperasi Nusantara Merah Putih (KMNMP) tidak dapat disetujui.

No. Registrasi: ${noRegistrasi}

Alasan Penolakan:
${alasan}

Catatan: Anda dapat mendaftar kembali setelah memperbaiki data sesuai alasan penolakan di atas.

Link Pendaftaran: ${FRONTEND_URL}/pendaftaran

© 2026 Koperasi Nusantara Merah Putih (KMNMP)
    `.trim(),
  };
}

// ============================================
// SEND EMAIL FUNCTIONS
// ============================================

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email via Resend
 */
async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Send email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send pendaftaran diterima email
 */
export async function sendPendaftaranDiterimaEmail(params: {
  email: string;
  namaLengkap: string;
  noRegistrasi: string;
  tierNama: string;
  harga: number;
}): Promise<SendEmailResult> {
  const template = generatePendaftaranDiterimaEmail(params);
  return sendEmail({
    to: params.email,
    ...template,
  });
}

/**
 * Send pembayaran berhasil email
 */
export async function sendPembayaranBerhasilEmail(params: {
  email: string;
  namaLengkap: string;
  noRegistrasi: string;
  tierNama: string;
  amount: number;
  paymentType: string;
}): Promise<SendEmailResult> {
  const template = generatePembayaranBerhasilEmail(params);
  return sendEmail({
    to: params.email,
    ...template,
  });
}

/**
 * Send approve email with NIAK
 */
export async function sendApproveEmail(params: {
  email: string;
  namaLengkap: string;
  niak: string;
  tierNama: string;
}): Promise<SendEmailResult> {
  const template = generateApproveEmail(params);
  return sendEmail({
    to: params.email,
    ...template,
  });
}

/**
 * Send reject email
 */
export async function sendRejectEmail(params: {
  email: string;
  namaLengkap: string;
  noRegistrasi: string;
  alasan: string;
}): Promise<SendEmailResult> {
  const template = generateRejectEmail(params);
  return sendEmail({
    to: params.email,
    ...template,
  });
}
