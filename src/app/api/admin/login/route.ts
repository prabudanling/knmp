// ============================================
// API: Admin Login
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { createSession, verifyPassword, getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data tidak valid',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Find admin user
    const admin = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, name: true, role: true, status: true, password: true },
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = verifyPassword(password, admin.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Check admin role
    if (admin.role !== 'ADMIN' && admin.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak' },
        { status: 403 }
      );
    }

    // Create session
    const token = await createSession(admin.id);

    return NextResponse.json({
      success: true,
      data: {
        token,
        admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
