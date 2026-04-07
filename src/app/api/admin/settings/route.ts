/**
 * Admin Settings API Route
 * GET /api/admin/settings - Get all settings
 * PUT /api/admin/settings - Update settings
 */

import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/auth';
import { 
  successResponse, 
  errorResponse, 
  logActivity,
  cache,
} from '@/lib/utils-server';

// Default settings
const DEFAULT_SETTINGS: Record<string, { value: string; type: string; description: string }> = {
  'site.name': { value: 'KMNMP', type: 'STRING', description: 'Nama situs' },
  'site.description': { value: 'Koperasi Multipihak Nusa Merah Putih', type: 'STRING', description: 'Deskripsi situs' },
  'site.email': { value: 'info@kmnmp.id', type: 'STRING', description: 'Email kontak' },
  'site.phone': { value: '+62 21 12345678', type: 'STRING', description: 'Nomor telepon' },
  'site.address': { value: 'Jakarta, Indonesia', type: 'STRING', description: 'Alamat' },
  'registration.enabled': { value: 'true', type: 'BOOL', description: 'Status pendaftaran' },
  'registration.message': { value: 'Pendaftaran anggota baru sedang dibuka', type: 'STRING', description: 'Pesan pendaftaran' },
  'payment.va_enabled': { value: 'true', type: 'BOOL', description: 'Status VA payment' },
  'payment.qris_enabled': { value: 'true', type: 'BOOL', description: 'Status QRIS payment' },
  'shu.distribution_month': { value: '3', type: 'INT', description: 'Bulan distribusi SHU (1-12)' },
  'notification.email_enabled': { value: 'true', type: 'BOOL', description: 'Status email notification' },
  'notification.sms_enabled': { value: 'false', type: 'BOOL', description: 'Status SMS notification' },
};

// GET - Get all settings
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (user) => {
    try {
      // Get all settings from database
      const settings = await db.setting.findMany();
      
      // Convert to object
      const settingsMap: Record<string, string> = {};
      settings.forEach(s => {
        settingsMap[s.key] = s.value;
      });

      // Merge with defaults
      const result: Record<string, { value: string; type: string; description: string }> = {};
      
      Object.entries(DEFAULT_SETTINGS).forEach(([key, config]) => {
        result[key] = {
          value: settingsMap[key] ?? config.value,
          type: config.type,
          description: config.description,
        };
      });

      // Add any custom settings
      settings.forEach(s => {
        if (!DEFAULT_SETTINGS[s.key]) {
          result[s.key] = {
            value: s.value,
            type: s.type,
            description: s.description || '',
          };
        }
      });

      return Response.json(
        successResponse(result)
      );
    } catch (error) {
      console.error('Get settings error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  return withAdminAuth(request, async (adminUser) => {
    try {
      const body = await request.json();
      const { settings } = body;

      if (!settings || typeof settings !== 'object') {
        return Response.json(
          errorResponse('Data settings tidak valid', 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }

      // Update each setting
      const updates = [];
      for (const [key, value] of Object.entries(settings)) {
        const type = DEFAULT_SETTINGS[key]?.type || 'STRING';
        const description = DEFAULT_SETTINGS[key]?.description || '';
        
        updates.push(
          db.setting.upsert({
            where: { key },
            create: {
              key,
              value: String(value),
              type,
              description,
            },
            update: {
              value: String(value),
            },
          })
        );
      }

      await Promise.all(updates);

      // Clear cache
      cache.clear();

      // Log activity
      await logActivity({
        userId: adminUser.id,
        action: 'UPDATE',
        entity: 'Setting',
        description: `Updated ${Object.keys(settings).length} settings`,
        metadata: { keys: Object.keys(settings) },
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      });

      return Response.json(
        successResponse(null, 'Pengaturan berhasil disimpan')
      );
    } catch (error) {
      console.error('Update settings error:', error);
      return Response.json(
        errorResponse('Terjadi kesalahan pada server', 'SERVER_ERROR'),
        { status: 500 }
      );
    }
  });
}
