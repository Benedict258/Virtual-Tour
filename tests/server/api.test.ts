import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

const TEST_ADMIN_PASSCODE = 'lagos2024';

// Use vi.hoisted so mockServices is available in vi.mock factories (which are hoisted)
const mockServices = vi.hoisted(() => ({
  createTourRequest: vi.fn(),
  addNewsletterSubscriber: vi.fn(),
  getRecommendedTours: vi.fn(),
  getActiveLiveTour: vi.fn(),
  updateLiveTour: vi.fn(),
  createStreamProvider: vi.fn(),
  getStreamProvider: vi.fn(),
  getStreamProviders: vi.fn(),
  updateStreamProvider: vi.fn(),
  deleteStreamProvider: vi.fn(),
  createLiveTour: vi.fn(),
  getLiveTourHistory: vi.fn(),
  getCatalogTours: vi.fn(),
  createCatalogTour: vi.fn(),
  updateCatalogTour: vi.fn(),
  deleteCatalogTour: vi.fn(),
  writeOperationLog: vi.fn(),
  getOperationLogs: vi.fn(),
  writeViewerSnapshot: vi.fn(),
  getAnalyticsSummary: vi.fn(),
  getTourRequests: vi.fn(),
  updateTourRequestStatus: vi.fn(),
  getNewsletterSubscribers: vi.fn(),
  updateRecommendedTour: vi.fn(),
  deleteRecommendedTour: vi.fn(),
}));

vi.mock('../../src/server/db/firestore', () => ({
  initializeFirebase: vi.fn(),
  getRealtimeDB: vi.fn(),
  COLLECTIONS: {
    users: 'users',
    stream_providers: 'stream_providers',
    live_tours: 'live_tours',
    catalog_tours: 'catalog_tours',
    recommended_tours: 'recommended_tours',
    tour_requests: 'tour_requests',
    newsletter_subscribers: 'newsletter_subscribers',
    viewer_events: 'viewer_events',
    operation_logs: 'operation_logs',
  },
}));

vi.mock('../../src/server/db/seed', () => ({
  initializeFirestoreData: vi.fn(),
}));

vi.mock('../../src/server/db/services', () => mockServices);

// Prevent server from actually listening
vi.mock('node:http', async () => {
  const actual = await vi.importActual('node:http');
  return {
    ...actual,
    createServer: vi.fn().mockReturnValue({
      on: vi.fn(),
      listen: vi.fn(),
    }),
  };
});

import app from '../../server';

describe('Public API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return ok status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/recommended-tours', () => {
    it('should return recommended tours from Firestore', async () => {
      const mockTours = [
        { id: '1', title: 'Test Tour', rank: 1 },
        { id: '2', title: 'Test Tour 2', rank: 2 },
      ];
      mockServices.getRecommendedTours.mockResolvedValue(mockTours);

      const res = await request(app).get('/api/recommended-tours');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });

    it('should fallback to static data on Firestore error', async () => {
      mockServices.getRecommendedTours.mockRejectedValue(new Error('Firestore error'));

      const res = await request(app).get('/api/recommended-tours');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/tour-status', () => {
    it('should return tour status', async () => {
      const res = await request(app).get('/api/tour-status');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('isLive');
      expect(res.body.data).toHaveProperty('viewerCount');
    });
  });

  describe('POST /api/tour-requests', () => {
    it('should accept valid tour request', async () => {
      mockServices.createTourRequest.mockResolvedValue({ id: '1' });

      const res = await request(app)
        .post('/api/tour-requests')
        .send({ destination: 'Lekki Conservation Centre', email: 'test@example.com' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toEqual({ ok: true });
    });

    it('should reject short destination', async () => {
      const res = await request(app)
        .post('/api/tour-requests')
        .send({ destination: 'AB', email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should reject invalid email', async () => {
      const res = await request(app)
        .post('/api/tour-requests')
        .send({ destination: 'Valid Destination', email: 'not-an-email' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should handle Firestore errors gracefully', async () => {
      mockServices.createTourRequest.mockRejectedValue(new Error('Firestore error'));

      const res = await request(app)
        .post('/api/tour-requests')
        .send({ destination: 'Valid Destination', email: 'test@example.com' });
      expect(res.status).toBe(201);
    });
  });

  describe('POST /api/newsletter', () => {
    it('should accept valid email', async () => {
      mockServices.addNewsletterSubscriber.mockResolvedValue({ id: 'test' });

      const res = await request(app)
        .post('/api/newsletter')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data');
    });

    it('should reject invalid email', async () => {
      const res = await request(app)
        .post('/api/newsletter')
        .send({ email: 'not-an-email' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/catalog', () => {
    it('should return catalog tours', async () => {
      mockServices.getCatalogTours.mockResolvedValue([]);

      const res = await request(app).get('/api/catalog');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });
});

describe('Admin API Endpoints - Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject requests without passcode', async () => {
    const res = await request(app).get('/admin/streams');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should reject requests with wrong passcode', async () => {
    const res = await request(app)
      .get('/admin/streams')
      .set('x-admin-passcode', 'wrong-passcode');
    expect(res.status).toBe(401);
  });

  it('should accept requests with correct passcode', async () => {
    mockServices.getStreamProviders.mockResolvedValue([]);
    const res = await request(app)
      .get('/admin/streams')
      .set('x-admin-passcode', TEST_ADMIN_PASSCODE);
    expect(res.status).toBe(200);
  });
});

describe('Admin API Endpoints - Stream Providers', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /admin/streams - should return providers', async () => {
    const mockProviders = [
      { id: '1', type: 'youtube', name: 'YouTube', config: {}, createdAt: new Date() },
    ];
    mockServices.getStreamProviders.mockResolvedValue(mockProviders);

    const res = await request(app).get('/admin/streams').set(adminHeaders);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('POST /admin/streams - should create provider', async () => {
    const mockProvider = { id: '1', type: 'youtube', name: 'YouTube', config: {}, createdAt: new Date() };
    mockServices.createStreamProvider.mockResolvedValue(mockProvider);

    const res = await request(app)
      .post('/admin/streams')
      .set(adminHeaders)
      .send({ type: 'youtube', name: 'YouTube Channel', config: {} });
    expect(res.status).toBe(201);
  });

  it('POST /admin/streams - should reject invalid type', async () => {
    const res = await request(app)
      .post('/admin/streams')
      .set(adminHeaders)
      .send({ type: 'invalid', name: 'Test', config: {} });
    expect(res.status).toBe(400);
  });

  it('POST /admin/streams - should reject empty name', async () => {
    const res = await request(app)
      .post('/admin/streams')
      .set(adminHeaders)
      .send({ type: 'youtube', name: '', config: {} });
    expect(res.status).toBe(400);
  });

  it('PUT /admin/streams/:id - should update provider', async () => {
    const mockProvider = { id: '1', type: 'youtube', name: 'YouTube', config: {} };
    mockServices.getStreamProvider.mockResolvedValue(mockProvider);
    mockServices.updateStreamProvider.mockResolvedValue(undefined);

    const res = await request(app)
      .put('/admin/streams/1')
      .set(adminHeaders)
      .send({ name: 'Updated Name' });
    expect(res.status).toBe(200);
  });

  it('PUT /admin/streams/:id - should return 404 for missing provider', async () => {
    mockServices.getStreamProvider.mockResolvedValue(null);

    const res = await request(app)
      .put('/admin/streams/nonexistent')
      .set(adminHeaders)
      .send({ name: 'Updated Name' });
    expect(res.status).toBe(404);
  });

  it('DELETE /admin/streams/:id - should delete provider', async () => {
    const mockProvider = { id: '1', type: 'youtube', name: 'YouTube' };
    mockServices.getStreamProvider.mockResolvedValue(mockProvider);
    mockServices.deleteStreamProvider.mockResolvedValue(undefined);

    const res = await request(app).delete('/admin/streams/1').set(adminHeaders);
    expect(res.status).toBe(200);
  });

  it('DELETE /admin/streams/:id - should return 404 for missing provider', async () => {
    mockServices.getStreamProvider.mockResolvedValue(null);

    const res = await request(app).delete('/admin/streams/nonexistent').set(adminHeaders);
    expect(res.status).toBe(404);
  });
});

describe('Admin API Endpoints - Live Tours', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /admin/tours - should return tour history', async () => {
    mockServices.getLiveTourHistory.mockResolvedValue([]);

    const res = await request(app).get('/admin/tours').set(adminHeaders);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('POST /admin/tours - should create live tour', async () => {
    const mockProvider = { id: 'provider1', type: 'youtube' };
    const mockTour = { id: 'tour1', title: 'Test Tour', status: 'draft' };
    mockServices.getStreamProvider.mockResolvedValue(mockProvider);
    mockServices.createLiveTour.mockResolvedValue(mockTour);

    const res = await request(app)
      .post('/admin/tours')
      .set(adminHeaders)
      .send({
        streamProviderId: 'provider1',
        title: 'Test Tour',
        shortDescription: 'A test tour',
        hostName: 'Admin',
        location: 'Lagos',
      });
    expect(res.status).toBe(201);
  });

  it('POST /admin/tours - should reject missing streamProviderId', async () => {
    const res = await request(app)
      .post('/admin/tours')
      .set(adminHeaders)
      .send({ title: 'Test Tour' });
    expect(res.status).toBe(400);
  });

  it('POST /admin/tours - should reject missing title', async () => {
    const res = await request(app)
      .post('/admin/tours')
      .set(adminHeaders)
      .send({ streamProviderId: 'provider1' });
    expect(res.status).toBe(400);
  });

  it('POST /admin/tours - should reject if stream provider not found', async () => {
    mockServices.getStreamProvider.mockResolvedValue(null);

    const res = await request(app)
      .post('/admin/tours')
      .set(adminHeaders)
      .send({ streamProviderId: 'nonexistent', title: 'Test Tour' });
    expect(res.status).toBe(404);
  });

  it('PUT /admin/tours/:id - should update tour', async () => {
    mockServices.updateLiveTour.mockResolvedValue(undefined);

    const res = await request(app)
      .put('/admin/tours/tour1')
      .set(adminHeaders)
      .send({ status: 'live' });
    expect(res.status).toBe(200);
  });

  it('PUT /admin/tours/:id - should reject invalid status', async () => {
    const res = await request(app)
      .put('/admin/tours/tour1')
      .set(adminHeaders)
      .send({ status: 'invalid' });
    expect(res.status).toBe(400);
  });

  it('PUT /admin/tours/:id - should accept all valid statuses', async () => {
    for (const status of ['draft', 'scheduled', 'live', 'ended']) {
      mockServices.updateLiveTour.mockResolvedValue(undefined);
      const res = await request(app)
        .put('/admin/tours/tour1')
        .set(adminHeaders)
        .send({ status });
      expect(res.status).toBe(200);
    }
  });
});

describe('Admin API Endpoints - Catalog Tours', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /admin/catalog - should create catalog tour', async () => {
    const mockTour = { id: '1', title: 'New Tour' };
    mockServices.createCatalogTour.mockResolvedValue(mockTour);

    const res = await request(app)
      .post('/admin/catalog')
      .set(adminHeaders)
      .send({ title: 'New Tour', category: 'Culture', free: true });
    expect(res.status).toBe(201);
  });

  it('POST /admin/catalog - should reject missing title', async () => {
    const res = await request(app)
      .post('/admin/catalog')
      .set(adminHeaders)
      .send({ category: 'Culture' });
    expect(res.status).toBe(400);
  });

  it('PUT /admin/catalog/:id - should update catalog tour', async () => {
    mockServices.updateCatalogTour.mockResolvedValue(undefined);

    const res = await request(app)
      .put('/admin/catalog/1')
      .set(adminHeaders)
      .send({ title: 'Updated Tour' });
    expect(res.status).toBe(200);
  });

  it('DELETE /admin/catalog/:id - should delete catalog tour', async () => {
    mockServices.deleteCatalogTour.mockResolvedValue(undefined);

    const res = await request(app).delete('/admin/catalog/1').set(adminHeaders);
    expect(res.status).toBe(200);
  });
});

describe('Admin API Endpoints - Recommended Tours', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /admin/recommended-tours - should reject missing title', async () => {
    const res = await request(app)
      .post('/admin/recommended-tours')
      .set(adminHeaders)
      .send({ host: 'Admin' });
    expect(res.status).toBe(400);
  });

  it('PUT /admin/recommended-tours/:id - should update recommended tour', async () => {
    mockServices.updateRecommendedTour.mockResolvedValue(undefined);

    const res = await request(app)
      .put('/admin/recommended-tours/1')
      .set(adminHeaders)
      .send({ title: 'Updated Tour' });
    expect(res.status).toBe(200);
  });

  it('DELETE /admin/recommended-tours/:id - should delete recommended tour', async () => {
    mockServices.deleteRecommendedTour.mockResolvedValue(undefined);

    const res = await request(app).delete('/admin/recommended-tours/1').set(adminHeaders);
    expect(res.status).toBe(200);
  });
});

describe('Admin API Endpoints - Tour Requests', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /admin/tour-requests - should return requests', async () => {
    mockServices.getTourRequests.mockResolvedValue([]);

    const res = await request(app).get('/admin/tour-requests').set(adminHeaders);
    expect(res.status).toBe(200);
  });

  it('PUT /admin/tour-requests/:id - should update request status', async () => {
    mockServices.updateTourRequestStatus.mockResolvedValue(undefined);

    const res = await request(app)
      .put('/admin/tour-requests/1')
      .set(adminHeaders)
      .send({ status: 'reviewed' });
    expect(res.status).toBe(200);
  });

  it('PUT /admin/tour-requests/:id - should reject invalid status', async () => {
    const res = await request(app)
      .put('/admin/tour-requests/1')
      .set(adminHeaders)
      .send({ status: 'invalid' });
    expect(res.status).toBe(400);
  });

  it('PUT /admin/tour-requests/:id - should accept all valid statuses', async () => {
    for (const status of ['new', 'reviewed', 'planned', 'rejected']) {
      mockServices.updateTourRequestStatus.mockResolvedValue(undefined);
      const res = await request(app)
        .put('/admin/tour-requests/1')
        .set(adminHeaders)
        .send({ status });
      expect(res.status).toBe(200);
    }
  });
});

describe('Admin API Endpoints - Newsletter', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /admin/newsletter - should return subscribers', async () => {
    mockServices.getNewsletterSubscribers.mockResolvedValue([]);

    const res = await request(app).get('/admin/newsletter').set(adminHeaders);
    expect(res.status).toBe(200);
  });
});

describe('Admin API Endpoints - Analytics & Logs', () => {
  const adminHeaders = { 'x-admin-passcode': TEST_ADMIN_PASSCODE };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /admin/analytics - should return analytics summary', async () => {
    mockServices.getAnalyticsSummary.mockResolvedValue({
      totalTourRequests: 0,
      totalSubscribers: 0,
      totalLiveTours: 0,
      totalViewers: 0,
      avgViewers: 0,
      recentLogs: [],
    });

    const res = await request(app).get('/admin/analytics').set(adminHeaders);
    expect(res.status).toBe(200);
  });

  it('GET /admin/logs - should return operation logs', async () => {
    mockServices.getOperationLogs.mockResolvedValue([]);

    const res = await request(app).get('/admin/logs').set(adminHeaders);
    expect(res.status).toBe(200);
  });
});
