/**
 * Admin Dashboard API
 * GET /api/admin/dashboard - Get dashboard statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user || !isAdmin(user)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Get statistics
    const [
      totalPendaftaran,
      pendingPendaftaran,
      approvedPendaftaran,
      rejectedPendaftaran,
      totalAnggota,
      activeAnggota,
      totalPayments,
      pendingPayments,
    ] = await Promise.all([
      // Total pendaftaran
      db.pendaftaran.count(),
      // Pending pendaftaran
      db.pendaftaran.count({
        where: { status: { in: ['PENDING', 'DOCUMENT_REVIEW', 'PAYMENT_PENDING'] } },
      }),
      // Approved pendaftaran
      db.pendaftaran.count({ where: { status: 'APPROVED' } }),
      // Rejected pendaftaran
      db.pendaftaran.count({ where: { status: 'REJECTED' } }),
      // Total anggota
      db.user.count({ where: { role: 'MEMBER' } }),
      // Active anggota
      db.user.count({ where: { role: 'MEMBER', status: 'ACTIVE' } }),
      // Total payments
      db.payment.count(),
      // Pending payments
      db.payment.count({ where: { status: 'PENDING' } }),
    ]);

    // Get recent pendaftaran
    const recentPendaftaran = await db.pendaftaran.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        tier: { select: { code: true, name: true } },
      },
    });

    // Get recent activities
    const recentActivities = await db.activityLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    // Calculate total revenue
    const payments = await db.payment.findMany({
      where: { status: 'PAID' },
      select: { amount: true },
    });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          pendaftaran: {
            total: totalPendaftaran,
            pending: pendingPendaftaran,
            approved: approvedPendaftaran,
            rejected: rejectedPendaftaran,
          },
          anggota: {
            total: totalAnggota,
            active: activeAnggota,
          },
          payments: {
            total: totalPayments,
            pending: pendingPayments,
          },
          revenue: {
            total: totalRevenue,
            formatted: formatRupiah(totalRevenue),
          },
        },
        recentPendaftaran: recentPendaftaran.map(p => ({
          id: p.id,
          nomorPendaftaran: p.nomorPendaftaran,
          namaLengkap: p.namaLengkap,
          email: p.email,
          phone: p.phone,
          status: p.status,
          tier: p.tier,
          createdAt: p.createdAt,
        })),
        recentActivities: recentActivities.map(a => ({
          id: a.id,
          action: a.action,
          entity: a.entity,
          description: a.description,
          user: a.user,
          createdAt: a.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
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
