import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

import {
  getRecommendedTours,
  submitTourRequest,
  subscribeToNewsletter,
  getStreamProviders,
  createStreamProvider,
  updateStreamProvider,
  deleteStreamProvider,
  getLiveTours,
  createLiveTour,
  updateLiveTour,
  getTourRequests,
  updateTourRequestStatus,
  getNewsletterSubscribers,
  getCatalogTours,
  adminGetCatalogTours,
  adminCreateCatalogTour,
  adminUpdateCatalogTour,
  adminDeleteCatalogTour,
  adminCreateRecommendedTour,
  adminUpdateRecommendedTour,
  adminDeleteRecommendedTour,
  getAnalyticsSummary,
  getOperationLogs,
} from '../../src/lib/api';

function mockJsonResponse(data: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: vi.fn().mockReturnValue('application/json'),
    },
    json: vi.fn().mockResolvedValue(data),
  };
}

describe('Public API Client Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRecommendedTours', () => {
    it('should return recommended tours', async () => {
      const mockData = { data: [{ id: 1, title: 'Tour 1', rank: 1 }] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getRecommendedTours();
      expect(result).toEqual(mockData.data);
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/recommended-tours',
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      );
    });

    it('should throw on API error', async () => {
      mockFetch.mockResolvedValue(mockJsonResponse({ error: 'Server error' }, 500));

      await expect(getRecommendedTours()).rejects.toThrow('Server error');
    });
  });

  describe('submitTourRequest', () => {
    it('should submit valid tour request', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await submitTourRequest({
        destination: 'Lekki Conservation Centre',
        email: 'test@example.com',
      });
      expect(result).toEqual({ data: { ok: true } });
    });

    it('should throw on validation error', async () => {
      mockFetch.mockResolvedValue(mockJsonResponse({ error: 'Invalid email' }, 400));

      await expect(submitTourRequest({
        destination: 'Test',
        email: 'invalid',
      })).rejects.toThrow('Invalid email');
    });
  });

  describe('subscribeToNewsletter', () => {
    it('should subscribe valid email', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await subscribeToNewsletter({ email: 'test@example.com' });
      expect(result).toEqual({ data: { ok: true } });
    });
  });

  describe('getCatalogTours', () => {
    it('should return catalog tours', async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getCatalogTours();
      expect(result).toEqual(mockData);
    });
  });
});

describe('Admin API Client Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Stream Providers', () => {
    it('getStreamProviders - should return providers', async () => {
      const mockData = { data: [{ id: '1', type: 'youtube', name: 'YT' }] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getStreamProviders('passcode');
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/admin/streams'),
        expect.objectContaining({
          headers: expect.objectContaining({ 'X-Admin-Passcode': 'passcode' }),
        }),
      );
    });

    it('createStreamProvider - should create provider', async () => {
      const mockData = { data: { id: '1', type: 'youtube', name: 'YT' } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await createStreamProvider('passcode', {
        type: 'youtube',
        name: 'YouTube',
        config: {},
      });
      expect(result).toEqual(mockData);
    });

    it('updateStreamProvider - should update provider', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await updateStreamProvider('passcode', '1', { name: 'Updated' });
      expect(result).toEqual(mockData);
    });

    it('deleteStreamProvider - should delete provider', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await deleteStreamProvider('passcode', '1');
      expect(result).toEqual(mockData);
    });
  });

  describe('Live Tours', () => {
    it('getLiveTours - should return tours', async () => {
      const mockData = { data: [{ id: '1', title: 'Tour', status: 'draft' }] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getLiveTours('passcode');
      expect(result).toEqual(mockData);
    });

    it('createLiveTour - should create tour', async () => {
      const mockData = { data: { id: '1', title: 'New Tour' } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await createLiveTour('passcode', {
        streamProviderId: 'provider1',
        title: 'New Tour',
        shortDescription: 'Test',
        hostName: 'Admin',
        location: 'Lagos',
      });
      expect(result).toEqual(mockData);
    });

    it('updateLiveTour - should update tour status', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await updateLiveTour('passcode', 'tour1', { status: 'live' });
      expect(result).toEqual(mockData);
    });
  });

  describe('Tour Requests', () => {
    it('getTourRequests - should return requests', async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getTourRequests('passcode');
      expect(result).toEqual(mockData);
    });

    it('updateTourRequestStatus - should update status', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await updateTourRequestStatus('passcode', 'req1', 'reviewed');
      expect(result).toEqual(mockData);
    });
  });

  describe('Newsletter', () => {
    it('getNewsletterSubscribers - should return subscribers', async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getNewsletterSubscribers('passcode');
      expect(result).toEqual(mockData);
    });
  });

  describe('Catalog Tours', () => {
    it('adminGetCatalogTours - should return tours', async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await adminGetCatalogTours('passcode');
      expect(result).toEqual(mockData);
    });

    it('adminCreateCatalogTour - should create tour', async () => {
      const mockData = { data: { id: '1', title: 'New Tour' } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await adminCreateCatalogTour('passcode', {
        title: 'New Tour',
        category: 'Culture',
        duration: '45m',
        description: '',
        imageUrl: '',
        free: true,
        visibility: 'public',
      });
      expect(result).toEqual(mockData);
    });

    it('adminUpdateCatalogTour - should update tour', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await adminUpdateCatalogTour('passcode', '1', { title: 'Updated' });
      expect(result).toEqual(mockData);
    });

    it('adminDeleteCatalogTour - should delete tour', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await adminDeleteCatalogTour('passcode', '1');
      expect(result).toEqual(mockData);
    });
  });

  describe('Recommended Tours (Admin)', () => {
    it('adminCreateRecommendedTour - should create tour', async () => {
      const mockData = { data: { id: 'new-key' } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData, 201));

      const result = await adminCreateRecommendedTour('passcode', {
        title: 'New Tour',
        host: 'Admin',
        time: '2PM',
        tags: ['History'],
        img: '',
        rank: 1,
      });
      expect(result).toEqual(mockData);
    });

    it('adminUpdateRecommendedTour - should update tour', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await adminUpdateRecommendedTour('passcode', 1, { title: 'Updated' });
      expect(result).toEqual(mockData);
    });

    it('adminDeleteRecommendedTour - should delete tour', async () => {
      const mockData = { data: { ok: true } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await adminDeleteRecommendedTour('passcode', 1);
      expect(result).toEqual(mockData);
    });
  });

  describe('Analytics', () => {
    it('getAnalyticsSummary - should return summary', async () => {
      const mockData = { data: { totalTourRequests: 5, totalSubscribers: 10 } };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getAnalyticsSummary('passcode');
      expect(result).toEqual(mockData);
    });

    it('getOperationLogs - should return logs', async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValue(mockJsonResponse(mockData));

      const result = await getOperationLogs('passcode');
      expect(result).toEqual(mockData);
    });
  });
});

describe('API Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw on non-JSON response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: vi.fn().mockReturnValue('text/html'),
      },
      json: vi.fn(),
    });

    await expect(getRecommendedTours()).rejects.toThrow('API endpoint returned HTML');
  });

  it('should throw on network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(getRecommendedTours()).rejects.toThrow('Network error');
  });

  it('should handle error response without error field', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      headers: {
        get: vi.fn().mockReturnValue('application/json'),
      },
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(getRecommendedTours()).rejects.toThrow('Request failed with status 500');
  });
});
