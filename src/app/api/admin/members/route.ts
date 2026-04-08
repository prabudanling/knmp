/**
 * Admin Members API Route
 * GET /api/admin/members - List members
 * POST /api/admin/members - Create member (admin create)
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth, hashPassword } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  paginatedResponse, 
  isValidEmail,
  isValidPhone,
  logActivity,
} from '@/lib/utils-server';
import { generateNIAK } from '@/lib/niak';

// GET - List members with pagination and filters
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '20');
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status') || '';
      const role = searchParams.get('role') || '';
      const tierId = searchParams.get('tierId') || '';
      const kpaId = searchParams.get('kpaId') || '';
      const provinsi = searchParams.get('provinsi') || '';

      const skip = (page - 1) * limit;

      // Build where clause
      const where: Record<string, unknown> = {};
      
      if (search) {
        where.OR = [
          { name: { contains: search } },
          { email: { contains: search } },
          { niak: { contains: search } },
          { nik: { contains: search } },
          { phone: { contains: search } },
        ];
      }
      
      if (status) {
        where.status = status;
      }
      
      if (role) {
        where.role = role;
      }
      
      if (tierId) {
        where.tierId = tierId;
      }
      
      if (kpaId) {
        where.kpaId = kpaId;
      }
      
      if (provinsi) {
        where.provinsi = provinsi;
      }

      // Get total count
      const total = await db.user.count({ where });

      // Get members
      const members = await db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          niak: true,
          nik: true,
          role: true,
          status: true,
          provinsi: true,
          kabKota: true,
          tier: {
            select: { id: true, code: true, name: true },
          },
          kpa: {
            select: { id: true, code: true, name: true },
          },
          joinDate: true,
          approvedAt: true,
          createdAt: true,
          lastLoginAt: true,
          simpananPokok: true,
          simpananWajib: true,
          simpananSukarela: true,
        },
      });

      return Response.json(
        paginatedResponse(members, page, limit, total)
      );
    } catch (error) {
      console.error('List members error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}

// POST - Create new member (by admin)
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const {
        name,
        email,
        phone,
        password,
        nik,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        alamat,
        rt,
        rw,
        kelurahan,
        kecamatan,
        kabKota,
        provinsi,
        kodePos,
        tierId,
        kpaId,
        role,
        autoApprove = true,
      } = body;

      // Validate required fields
      if (!name || !email || !phone || !tierId) {
        return Response.json(
          errorResponse('Data tidak lengkap', 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }

      // Validate email
      if (!isValidEmail(email)) {
        return Response.json(
          errorResponse('Format email tidak valid', 'INVALID_EMAIL'),
          { status: 400 }
        );
      }

      // Check if email exists
      const existingUser = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        return Response.json(
          errorResponse('Email sudah terdaftar', 'EMAIL_EXISTS'),
          { status: 400 }
        );
      }

      // Get tier
      const tier = await db.tier.findUnique({
        where: { id: tierId },
      });

      if (!tier) {
        return Response.json(
          errorResponse('Tier tidak ditemukan', 'TIER_NOT_FOUND'),
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = password 
        ? hashPassword(password)
        : hashPassword(Math.random().toString(36).slice(-8));

      // Create user
      const newUser = await db.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          name,
          phone,
          nik,
          tempatLahir,
          tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
          jenisKelamin,
          alamat,
          rt,
          rw,
          kelurahan,
          kecamatan,
          kabKota,
          provinsi,
          kodePos,
          tierId,
          kpaId,
          role: role || 'MEMBER',
          status: autoApprove ? 'ACTIVE' : 'PENDING',
          approvedAt: autoApprove ? new Date() : null,
          approvedBy: autoApprove ? adminUser.id : null,
          joinDate: autoApprove ? new Date() : null,
          simpananPokok: tier.price, // Set simpanan pokok from tier price
        },
      });

      // Generate NIAK if approved
      if (autoApprove && tier.code && kpaId) {
        const kpa = await db.kPA.findUnique({ where: { id: kpaId } });
        if (kpa) {
          const niak = await generateNIAK({
            provinsi: provinsi?.slice(0, 2) || '00',
            kabKota: kabKota?.slice(0, 2) || '00',
            kpaCode: kpa.code,
            tierCode: tier.code,
          });
          await db.user.update({
            where: { id: newUser.id },
            data: { niak },
          });
        }
      }

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'CREATE',
        entity: 'User',
        entityId: newUser.id,
        description: `Admin created user: ${email}`,
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      return Response.json(
        successResponse({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          status: newUser.status,
        }, 'Anggota berhasil ditambahkan')
      );
    } catch (error) {
      console.error('Create member error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
