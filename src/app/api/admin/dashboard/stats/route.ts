/**
 * Admin Dashboard Stats API Route
 * GET /api/admin/dashboard/stats
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  getDashboardStats, 
  getMemberGrowthByMonth,
  getMembersByProvince,
  getMembersByKPA,
  getMembersByTier,
  cache,
} from '@/lib/utils-server';

// GET - Get dashboard statistics
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      // Get basic stats
      const stats = await getDashboardStats();

      // Get member growth for current year
      const memberGrowth = await getMemberGrowthByMonth();

      // Get geographic distribution
      const membersByProvince = await getMembersByProvince();

      // Get KPA distribution
      const membersByKPA = await getMembersByKPA();

      // Get Tier distribution
      const membersByTier = await getMembersByTier();

      // Get recent activities
      const recentActivities = await db.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      // Get pending registrations count by status
      const pendingByStatus = await db.pendaftaran.groupBy({
        by: ['status'],
        _count: true,
      });

      // Get payments summary
      const paymentsByStatus = await db.payment.groupBy({
        by: ['status'],
        _count: true,
        _sum: { amount: true },
      });

      // Get today's stats
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [newMembersToday, newRegistrationsToday, paymentsToday] = await Promise.all([
        db.user.count({
          where: {
            role: 'MEMBER',
            status: 'ACTIVE',
            approvedAt: { gte: today },
          },
        }),
        db.pendaftaran.count({
          where: { createdAt: { gte: today } },
        }),
        db.payment.aggregate({
          where: {
            status: 'PAID',
            paidAt: { gte: today },
          },
          _sum: { amount: true },
          _count: true,
        }),
      ]);

      return Response.json(
        successResponse({
          stats,
          today: {
            newMembers: newMembersToday,
            newRegistrations: newRegistrationsToday,
            payments: paymentsToday._count,
            revenue: paymentsToday._sum.amount || 0,
          },
          charts: {
            memberGrowth,
            membersByProvince: membersByProvince.slice(0, 10),
            membersByKPA,
            membersByTier,
          },
          recentActivities,
          pendingByStatus,
          paymentsByStatus,
        })
      );
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
