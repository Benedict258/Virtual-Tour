import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';

// Mock firebase-admin/auth
vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn().mockReturnValue({
    verifyIdToken: vi.fn(),
  }),
}));

// Mock users module
vi.mock('../../src/server/auth/users', () => ({
  getUserById: vi.fn(),
}));

// Mock firestore module
vi.mock('../../src/server/db/firestore', () => ({
  getRealtimeDB: vi.fn().mockReturnValue({
    ref: vi.fn().mockReturnValue({
      child: vi.fn().mockReturnThis(),
      get: vi.fn().mockResolvedValue({
        exists: vi.fn().mockReturnValue(false),
        val: vi.fn().mockReturnValue(null),
      }),
      set: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
    }),
  }),
  COLLECTIONS: {
    users: 'users',
  },
}));

import {
  verifyFirebaseToken,
  requireAuth,
  requireAdmin,
  requireHostOrAdmin,
  type AuthRequest,
} from '../../src/server/auth/middleware';
import { getAuth } from 'firebase-admin/auth';
import { getUserById } from '../../src/server/auth/users';

function createMockReq(authHeader?: string): AuthRequest {
  return {
    headers: {
      authorization: authHeader,
    },
    user: undefined,
  } as unknown as AuthRequest;
}

function createMockRes(): Response {
  const res: any = {
    statusCode: 200,
    _body: null as unknown,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(data: unknown) {
      res._body = data;
      return res;
    },
  };
  return res as Response;
}

describe('verifyFirebaseToken Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call next() when no Authorization header', async () => {
    const req = createMockReq();
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    await verifyFirebaseToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });

  it('should call next() when Authorization header does not start with Bearer', async () => {
    const req = createMockReq('Basic abc123');
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    await verifyFirebaseToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });

  it('should verify token and attach user when valid', async () => {
    const mockAuth = getAuth();
    (mockAuth.verifyIdToken as any).mockResolvedValue({
      uid: 'user-123',
      email: 'admin@example.com',
    });
    (getUserById as any).mockResolvedValue({
      id: 'user-123',
      email: 'admin@example.com',
      role: 'admin',
      displayName: 'Admin',
    });

    const req = createMockReq('Bearer valid-token-123');
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    await verifyFirebaseToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user?.uid).toBe('user-123');
    expect(req.user?.email).toBe('admin@example.com');
    expect(req.user?.role).toBe('admin');
  });

  it('should call next() without user when token verification fails', async () => {
    const mockAuth = getAuth();
    (mockAuth.verifyIdToken as any).mockRejectedValue(new Error('Invalid token'));

    const req = createMockReq('Bearer invalid-token');
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    await verifyFirebaseToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });

  it('should call next() without user when user not found in DB', async () => {
    const mockAuth = getAuth();
    (mockAuth.verifyIdToken as any).mockResolvedValue({
      uid: 'unknown-user',
      email: 'unknown@example.com',
    });
    (getUserById as any).mockResolvedValue(null);

    const req = createMockReq('Bearer valid-token');
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    await verifyFirebaseToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });
});

describe('requireAuth Middleware', () => {
  it('should return 401 when no user is authenticated', () => {
    const req = createMockReq() as AuthRequest;
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(res.statusCode).toBe(401);
    expect((res as any)._body).toEqual({ error: 'Unauthorized: Please log in.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() when user is authenticated', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'viewer' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe('requireAdmin Middleware', () => {
  it('should return 401 when no user is authenticated', () => {
    const req = createMockReq() as AuthRequest;
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 when user is not admin', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'host@example.com', role: 'host' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(res.statusCode).toBe(403);
    expect((res as any)._body).toEqual({ error: 'Forbidden: Admin access required.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 when user is viewer', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'viewer@example.com', role: 'viewer' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(res.statusCode).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() when user is admin', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'admin@example.com', role: 'admin' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe('requireHostOrAdmin Middleware', () => {
  it('should return 401 when no user is authenticated', () => {
    const req = createMockReq() as AuthRequest;
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireHostOrAdmin(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 when user is viewer', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'viewer@example.com', role: 'viewer' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireHostOrAdmin(req, res, next);

    expect(res.statusCode).toBe(403);
    expect((res as any)._body).toEqual({ error: 'Forbidden: Host or admin access required.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() when user is host', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'host@example.com', role: 'host' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireHostOrAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call next() when user is admin', () => {
    const req = createMockReq() as AuthRequest;
    req.user = { uid: 'user-1', email: 'admin@example.com', role: 'admin' };
    const res = createMockRes();
    const next = vi.fn() as NextFunction;

    requireHostOrAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
