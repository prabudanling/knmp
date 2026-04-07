/**
 * Health Check Endpoint
 * GET /api/health
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 });
  }
}
