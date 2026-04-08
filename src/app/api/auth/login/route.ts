/**
 * Login API Route
 * POST /api/auth/login
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';
import { successResponse, errorResponse, logActivity } from '@/lib/utils-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return Response.json(
        errorResponse('Email dan password harus diisi', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return Response.json(
        errorResponse('Email atau password salah', 'INVALID_CREDENTIALS'),
        { status: 401 }
      );
    }

    // Check password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return Response.json(
        errorResponse('Email atau password salah', 'INVALID_CREDENTIALS'),
        { status: 401 }
      );
    }

    // Check user status
    if (user.status === 'SUSPENDED') {
      return Response.json(
        errorResponse('Akun Anda telah diblokir. Hubungi administrator.', 'ACCOUNT_SUSPENDED'),
        { status: 403 }
      );
    }

    if (user.status === 'PENDING') {
      return Response.json(
        errorResponse('Akun Anda belum diverifikasi. Mohon tunggu.', 'ACCOUNT_PENDING'),
        { status: 403 }
      );
    }

    // Create session
    const token = await createSession(user.id);

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Log activity
    await logActivity({
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      description: `User ${user.email} logged in`,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    // Return response with token and user info
    return Response.json(
      successResponse({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          niak: user.niak,
          tierId: user.tierId,
          kpaId: user.kpaId,
        },
      }, 'Login berhasil')
    );
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
      { status: 500 }
    );
  }
}
