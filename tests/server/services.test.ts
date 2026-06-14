import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the firestore module
vi.mock('../../src/server/db/firestore', () => {
  const mockRef = (path: string) => {
    const store: Record<string, any> = {};
    const refObj: any = {
      _path: path,
      _store: store,
      get: vi.fn().mockResolvedValue({
        exists: vi.fn().mockReturnValue(false),
        val: vi.fn().mockReturnValue(null),
      }),
      set: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      push: vi.fn().mockReturnValue({
        key: 'mock-key-' + Math.random().toString(36).slice(2, 8),
        set: vi.fn().mockResolvedValue(undefined),
      }),
      child: vi.fn().mockReturnThis(),
      orderByChild: vi.fn().mockReturnThis(),
      equalTo: vi.fn().mockReturnThis(),
      limitToFirst: vi.fn().mockReturnThis(),
    };
    return refObj;
  };

  return {
    initializeFirebase: vi.fn(),
    getRealtimeDB: vi.fn().mockReturnValue({
      ref: mockRef,
    }),
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
  };
});

import {
  createStreamProvider,
  getStreamProvider,
  getStreamProviders,
  updateStreamProvider,
  deleteStreamProvider,
  createTourRequest,
  getTourRequests,
  updateTourRequestStatus,
  addNewsletterSubscriber,
  getNewsletterSubscribers,
  getRecommendedTours,
  createRecommendedTour,
  updateRecommendedTour,
  deleteRecommendedTour,
  createLiveTour,
  getActiveLiveTour,
  getLiveTourHistory,
  updateLiveTour,
  getCatalogTours,
  createCatalogTour,
  updateCatalogTour,
  deleteCatalogTour,
  writeOperationLog,
  getOperationLogs,
  getAnalyticsSummary,
} from '../../src/server/db/services';

describe('Stream Provider Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createStreamProvider - should create and return a stream provider', async () => {
    const provider = await createStreamProvider({
      type: 'youtube',
      name: 'YouTube Channel',
      config: { youtubeVideoId: 'abc123' },
    });

    expect(provider).toHaveProperty('id');
    expect(provider.type).toBe('youtube');
    expect(provider.name).toBe('YouTube Channel');
    expect(provider.config).toEqual({ youtubeVideoId: 'abc123' });
    expect(provider).toHaveProperty('createdAt');
  });

  it('getStreamProvider - should return null for non-existent id', async () => {
    const result = await getStreamProvider('nonexistent');
    expect(result).toBeNull();
  });

  it('getStreamProviders - should return empty array initially', async () => {
    const providers = await getStreamProviders();
    expect(Array.isArray(providers)).toBe(true);
  });

  it('deleteStreamProvider - should not throw', async () => {
    await expect(deleteStreamProvider('some-id')).resolves.not.toThrow();
  });
});

describe('Tour Request Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createTourRequest - should create and return a request', async () => {
    const request = await createTourRequest('Lekki Conservation Centre', 'test@example.com');

    expect(request).toHaveProperty('id');
    expect(request.destination).toBe('Lekki Conservation Centre');
    expect(request.email).toBe('test@example.com');
    expect(request.status).toBe('new');
    expect(request).toHaveProperty('createdAt');
    expect(request).toHaveProperty('updatedAt');
  });

  it('getTourRequests - should return empty array initially', async () => {
    const requests = await getTourRequests();
    expect(Array.isArray(requests)).toBe(true);
  });

  it('updateTourRequestStatus - should not throw', async () => {
    await expect(updateTourRequestStatus('some-id', 'reviewed')).resolves.not.toThrow();
  });

  it('updateTourRequestStatus - should accept all valid statuses', async () => {
    const statuses = ['new', 'reviewed', 'planned', 'rejected'] as const;
    for (const status of statuses) {
      await expect(updateTourRequestStatus('id', status)).resolves.not.toThrow();
    }
  });
});

describe('Newsletter Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('addNewsletterSubscriber - should create subscriber', async () => {
    const subscriber = await addNewsletterSubscriber('test@example.com', 'newsletter_signup');

    expect(subscriber).toHaveProperty('id');
    expect(subscriber.email).toBe('test@example.com');
    expect(subscriber.source).toBe('newsletter_signup');
    expect(subscriber.subscribed).toBe(true);
  });

  it('addNewsletterSubscriber - should normalize email', async () => {
    const subscriber = await addNewsletterSubscriber('Test@Example.com');
    expect(subscriber.email).toBe('test@example.com');
  });

  it('getNewsletterSubscribers - should return empty array initially', async () => {
    const subscribers = await getNewsletterSubscribers();
    expect(Array.isArray(subscribers)).toBe(true);
  });
});

describe('Recommended Tour Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getRecommendedTours - should return empty array initially', async () => {
    const tours = await getRecommendedTours();
    expect(Array.isArray(tours)).toBe(true);
  });

  it('deleteRecommendedTour - should not throw', async () => {
    await expect(deleteRecommendedTour('some-id')).resolves.not.toThrow();
  });
});

describe('Live Tour Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createLiveTour - should create and return a tour', async () => {
    const tour = await createLiveTour({
      streamProviderId: 'provider1',
      title: 'Test Live Tour',
      shortDescription: 'A test tour',
      hostName: 'Admin',
      hostId: 'admin',
      location: 'Lagos',
      status: 'draft',
    });

    expect(tour).toHaveProperty('id');
    expect(tour.title).toBe('Test Live Tour');
    expect(tour.status).toBe('draft');
    expect(tour.viewerCount).toBe(0);
    expect(tour).toHaveProperty('createdAt');
    expect(tour).toHaveProperty('updatedAt');
  });

  it('getActiveLiveTour - should return null when no live tours', async () => {
    const tour = await getActiveLiveTour();
    expect(tour).toBeNull();
  });

  it('getLiveTourHistory - should return empty array initially', async () => {
    const tours = await getLiveTourHistory();
    expect(Array.isArray(tours)).toBe(true);
  });

  it('updateLiveTour - should not throw', async () => {
    await expect(updateLiveTour('tour-id', { status: 'live' })).resolves.not.toThrow();
  });

  it('updateLiveTour - should accept valid status transitions', async () => {
    const transitions = ['draft', 'scheduled', 'live', 'ended'] as const;
    for (const status of transitions) {
      await expect(updateLiveTour('id', { status })).resolves.not.toThrow();
    }
  });
});

describe('Catalog Tour Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getCatalogTours - should return empty array initially', async () => {
    const tours = await getCatalogTours();
    expect(Array.isArray(tours)).toBe(true);
  });

  it('createCatalogTour - should create and return a tour', async () => {
    const tour = await createCatalogTour({
      title: 'Test Catalog Tour',
      category: 'Culture',
      duration: 45,
      description: 'A test catalog tour',
      imageUrl: 'https://example.com/image.jpg',
      free: true,
      visibility: 'public',
    });

    expect(tour).toHaveProperty('id');
    expect(tour.title).toBe('Test Catalog Tour');
    expect(tour.category).toBe('Culture');
    expect(tour.free).toBe(true);
    expect(tour.visibility).toBe('public');
  });

  it('deleteCatalogTour - should not throw', async () => {
    await expect(deleteCatalogTour('some-id')).resolves.not.toThrow();
  });
});

describe('Operation Log Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writeOperationLog - should not throw', async () => {
    await expect(writeOperationLog({
      userId: 'admin',
      action: 'tour_go_live',
      resourceType: 'live_tour',
      resourceId: 'tour1',
      status: 'success',
    })).resolves.not.toThrow();
  });

  it('getOperationLogs - should return empty array initially', async () => {
    const logs = await getOperationLogs();
    expect(Array.isArray(logs)).toBe(true);
  });
});

describe('Analytics Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAnalyticsSummary - should return summary object', async () => {
    const summary = await getAnalyticsSummary();

    expect(summary).toHaveProperty('totalTourRequests');
    expect(summary).toHaveProperty('totalSubscribers');
    expect(summary).toHaveProperty('totalLiveTours');
    expect(summary).toHaveProperty('totalViewers');
    expect(summary).toHaveProperty('avgViewers');
    expect(summary).toHaveProperty('recentLogs');
    expect(typeof summary.totalTourRequests).toBe('number');
    expect(typeof summary.totalSubscribers).toBe('number');
    expect(typeof summary.totalLiveTours).toBe('number');
  });
});
