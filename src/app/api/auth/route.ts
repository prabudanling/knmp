/**
 * Authentication API
 * POST /api/auth/login - Admin login
 * POST /api/auth/logout - Admin logout
 * GET /api/auth/me - Get current user
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, verifyPassword, createSession, destroySession, getCurrentUser } from '@/lib/auth';

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak. Hanya admin yang dapat login.' },
        { status: 403 }
      );
    }

    // Check if user is active
    if (user.status === 'SUSPENDED' || user.status === 'REJECTED') {
      return NextResponse.json(
        { success: false, error: 'Akun Anda tidak aktif. Hubungi administrator.' },
        { status: 403 }
      );
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession(user.id);

    // Log activity
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entity: 'User',
        entityId: user.id,
        description: `User ${user.email} logged in`,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        niak: true,
        tier: { select: { code: true, name: true } },
        kpa: { select: { code: true, name: true } },
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: fullUser,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// DELETE /api/auth/logout
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      await destroySession(token);
    }

    return NextResponse.json({
      success: true,
      message: 'Logout berhasil',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}
