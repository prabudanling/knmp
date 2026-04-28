/**
 * KMNMP Notification Service
 * Real-time notifications using Socket.io
 * 
 * Port: 3003
 */

import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const PORT = 3003;

// Create HTTP server
const httpServer = new HttpServer();

// Create Socket.io server
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://kmnmp.id',
      'https://*.kmnmp.id',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// User connection tracking
const userSockets = new Map<string, Set<string>>();
const socketUsers = new Map<string, string>();

// Notification types
interface Notification {
  id: string;
  type: 'SYSTEM' | 'MEMBERSHIP' | 'PAYMENT' | 'TRANSACTION' | 'SHU' | 'MARKETPLACE' | 'ANNOUNCEMENT';
  title: string;
  message: string;
  link?: string;
  createdAt: Date;
}

// Generate notification ID
function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Handle new connection
io.on('connection', (socket: Socket) => {
  console.log(`[Socket] New connection: ${socket.id}`);

  // User authentication
  socket.on('authenticate', (data: { userId: string; token: string }) => {
    const { userId, token } = data;
    
    if (!userId) {
      socket.emit('error', { message: 'User ID required' });
      return;
    }

    // Store user-socket mapping
    socketUsers.set(socket.id, userId);
    
    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);

    // Join user's personal room
    socket.join(`user:${userId}`);
    
    // Join role-based rooms (if provided)
    if (data.token) {
      // In production, validate token here
      // For now, we'll trust the userId
    }

    console.log(`[Auth] User ${userId} authenticated on socket ${socket.id}`);
    
    // Send confirmation
    socket.emit('authenticated', { 
      userId, 
      socketId: socket.id,
      message: 'Successfully authenticated' 
    });

    // Send pending notifications (from database would be here in production)
    // For now, just send a welcome notification
    socket.emit('notification', {
      id: generateNotificationId(),
      type: 'SYSTEM',
      title: 'Terhubung',
      message: 'Anda terhubung ke server notifikasi real-time',
      createdAt: new Date(),
    });
  });

  // Handle join room
  socket.on('joinRoom', (room: string) => {
    socket.join(room);
    console.log(`[Room] Socket ${socket.id} joined room: ${room}`);
  });

  // Handle leave room
  socket.on('leaveRoom', (room: string) => {
    socket.leave(room);
    console.log(`[Room] Socket ${socket.id} left room: ${room}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const userId = socketUsers.get(socket.id);
    
    if (userId) {
      // Remove socket from user's socket set
      const userSocketSet = userSockets.get(userId);
      if (userSocketSet) {
        userSocketSet.delete(socket.id);
        
        // If user has no more sockets, remove from map
        if (userSocketSet.size === 0) {
          userSockets.delete(userId);
        }
      }
      
      // Remove socket-user mapping
      socketUsers.delete(socket.id);
      
      console.log(`[Socket] User ${userId} disconnected from socket ${socket.id}`);
    } else {
      console.log(`[Socket] Unknown socket disconnected: ${socket.id}`);
    }
  });

  // Handle errors
  socket.on('error', (error: Error) => {
    console.error(`[Error] Socket ${socket.id} error:`, error.message);
  });
});

// Admin namespace for admin dashboard
const adminNamespace = io.of('/admin');

adminNamespace.on('connection', (socket: Socket) => {
  console.log(`[Admin] New admin connection: ${socket.id}`);

  socket.on('authenticate', (data: { userId: string; role: string }) => {
    const { userId, role } = data;
    
    // Verify admin role
    const adminRoles = ['SUPER_ADMIN', 'ADMIN', 'KORNAS', 'KORWIL', 'KORDA', 'KORCAM', 'KORDES', 'KORBID'];
    
    if (!adminRoles.includes(role)) {
      socket.emit('error', { message: 'Unauthorized - Admin access required' });
      socket.disconnect();
      return;
    }

    socket.join(`admin:${userId}`);
    socket.join('admins');
    
    if (role === 'SUPER_ADMIN') {
      socket.join('super-admins');
    }

    console.log(`[Admin] Admin ${userId} (${role}) authenticated`);
    
    socket.emit('authenticated', { 
      userId, 
      role,
      message: 'Admin authenticated successfully' 
    });
  });

  // Broadcast to all admins
  socket.on('broadcast', (data: { event: string; payload: unknown }) => {
    adminNamespace.emit(data.event, data.payload);
  });
});

// Helper functions for sending notifications

/**
 * Send notification to a specific user
 */
export function sendToUser(userId: string, notification: Omit<Notification, 'id' | 'createdAt'>): void {
  const fullNotification: Notification = {
    ...notification,
    id: generateNotificationId(),
    createdAt: new Date(),
  };
  
  io.to(`user:${userId}`).emit('notification', fullNotification);
  console.log(`[Notify] Sent to user ${userId}: ${notification.title}`);
}

/**
 * Send notification to multiple users
 */
export function sendToUsers(userIds: string[], notification: Omit<Notification, 'id' | 'createdAt'>): void {
  const fullNotification: Notification = {
    ...notification,
    id: generateNotificationId(),
    createdAt: new Date(),
  };
  
  userIds.forEach(userId => {
    io.to(`user:${userId}`).emit('notification', fullNotification);
  });
  
  console.log(`[Notify] Sent to ${userIds.length} users: ${notification.title}`);
}

/**
 * Send notification to all admins
 */
export function sendToAdmins(notification: Omit<Notification, 'id' | 'createdAt'>): void {
  const fullNotification: Notification = {
    ...notification,
    id: generateNotificationId(),
    createdAt: new Date(),
  };
  
  adminNamespace.emit('notification', fullNotification);
  console.log(`[Notify] Sent to admins: ${notification.title}`);
}

/**
 * Broadcast to all connected clients
 */
export function broadcast(event: string, data: unknown): void {
  io.emit(event, data);
  console.log(`[Broadcast] Event: ${event}`);
}

/**
 * Get connected users count
 */
export function getConnectedUsersCount(): number {
  return userSockets.size;
}

/**
 * Check if user is online
 */
export function isUserOnline(userId: string): boolean {
  const sockets = userSockets.get(userId);
  return sockets !== undefined && sockets.size > 0;
}

/**
 * Get all online users
 */
export function getOnlineUsers(): string[] {
  return Array.from(userSockets.keys());
}

// Start server
httpServer.listen(PORT, () => {
  console.log(`\n🚀 KMNMP Notification Service running on port ${PORT}`);
  console.log(`📡 Socket.io server ready`);
  console.log(`🌐 CORS enabled for localhost:3000\n`);
});

// Export for external use
export { io, adminNamespace };
