import { describe, it, expect } from 'vitest';
import type { TourStatusPayload } from './useTourStatus';

interface TourStatusState {
  isLive: boolean;
  viewerCount: number;
  tour: { title: string; shortDescription: string; hostName?: string; startedAtLabel?: string; location?: string; streamImageUrl?: string; hostImageUrl?: string } | null;
  streamProvider?: { type: 'youtube' | 'mux' | 'cloudflare' | 'manual_hls' | 'browser_webrtc'; name: string; config: Record<string, unknown> };
}

function normalizePayloadLocal(payload: TourStatusPayload, current: TourStatusState): TourStatusState {
  const isLive = payload.isLive ?? payload.live ?? (payload.status ? payload.status === 'live' : current.isLive);
  const viewerCount = payload.viewerCount ?? payload.viewers ?? current.viewerCount;
  const tourPayload = payload.tour ?? {};
  const title = tourPayload.title ?? payload.title;
  const shortDescription = tourPayload.shortDescription ?? payload.shortDescription ?? payload.description;

  return {
    isLive,
    viewerCount,
    tour: isLive
      ? {
          title: title ?? current.tour?.title ?? 'Live tour',
          shortDescription: shortDescription ?? current.tour?.shortDescription ?? '',
          hostName: tourPayload.hostName ?? payload.hostName ?? current.tour?.hostName,
          startedAtLabel: tourPayload.startedAtLabel ?? payload.startedAtLabel ?? current.tour?.startedAtLabel,
          location: tourPayload.location ?? payload.location ?? current.tour?.location,
          streamImageUrl: tourPayload.streamImageUrl ?? payload.streamImageUrl ?? current.tour?.streamImageUrl,
          hostImageUrl: tourPayload.hostImageUrl ?? payload.hostImageUrl ?? current.tour?.hostImageUrl,
        }
      : null,
    streamProvider: payload.streamProvider ?? current.streamProvider,
  };
}

describe('Tour Status Payload Normalization', () => {

  const initialState: TourStatusState = {
    isLive: false,
    viewerCount: 0,
    tour: null,
  };

  describe('isLive detection', () => {
    it('should use isLive field when present', () => {
      const result = normalizePayloadLocal({ isLive: true }, initialState);
      expect(result.isLive).toBe(true);
    });

    it('should fallback to live field', () => {
      const result = normalizePayloadLocal({ live: true }, initialState);
      expect(result.isLive).toBe(true);
    });

    it('should fallback to status field', () => {
      const result = normalizePayloadLocal({ status: 'live' }, initialState);
      expect(result.isLive).toBe(true);
    });

    it('should use current state when no live indicator present', () => {
      const current = { ...initialState, isLive: true };
      const result = normalizePayloadLocal({ viewerCount: 100 }, current);
      expect(result.isLive).toBe(true);
    });

    it('should detect offline status', () => {
      const result = normalizePayloadLocal({ isLive: false }, initialState);
      expect(result.isLive).toBe(false);
    });
  });

  describe('viewerCount handling', () => {
    it('should use viewerCount field', () => {
      const result = normalizePayloadLocal({ viewerCount: 150 }, initialState);
      expect(result.viewerCount).toBe(150);
    });

    it('should fallback to viewers field', () => {
      const result = normalizePayloadLocal({ viewers: 200 }, initialState);
      expect(result.viewerCount).toBe(200);
    });

    it('should use current viewerCount when not provided', () => {
      const current = { ...initialState, viewerCount: 50 };
      const result = normalizePayloadLocal({}, current);
      expect(result.viewerCount).toBe(50);
    });
  });

  describe('tour data normalization', () => {
    it('should create tour object when live', () => {
      const result = normalizePayloadLocal(
        {
          isLive: true,
          title: 'Test Tour',
          shortDescription: 'A test',
          hostName: 'Admin',
          location: 'Lagos',
        },
        initialState,
      );

      expect(result.tour).not.toBeNull();
      expect(result.tour?.title).toBe('Test Tour');
      expect(result.tour?.shortDescription).toBe('A test');
      expect(result.tour?.hostName).toBe('Admin');
      expect(result.tour?.location).toBe('Lagos');
    });

    it('should use nested tour object', () => {
      const result = normalizePayloadLocal(
        {
          isLive: true,
          tour: {
            title: 'Nested Tour',
            shortDescription: 'Nested desc',
          },
        },
        initialState,
      );

      expect(result.tour?.title).toBe('Nested Tour');
      expect(result.tour?.shortDescription).toBe('Nested desc');
    });

    it('should null tour when offline', () => {
      const result = normalizePayloadLocal({ isLive: false }, initialState);
      expect(result.tour).toBeNull();
    });

    it('should fallback to description field', () => {
      const result = normalizePayloadLocal(
        {
          isLive: true,
          description: 'From description field',
        },
        initialState,
      );
      expect(result.tour?.shortDescription).toBe('From description field');
    });

    it('should fallback to current tour data', () => {
      const current: TourStatusState = {
        isLive: true,
        viewerCount: 100,
        tour: {
          title: 'Current Tour',
          shortDescription: 'Current desc',
          hostName: 'Current Host',
        },
      };

      const result = normalizePayloadLocal({ viewerCount: 150 }, current);
      expect(result.tour?.title).toBe('Current Tour');
      expect(result.tour?.hostName).toBe('Current Host');
    });
  });

  describe('stream provider handling', () => {
    it('should pass through stream provider', () => {
      const streamProvider = { type: 'youtube' as const, name: 'YT', config: {} };
      const result = normalizePayloadLocal({ streamProvider }, initialState);
      expect(result.streamProvider).toEqual(streamProvider);
    });

    it('should keep current stream provider when not provided', () => {
      const current: TourStatusState = {
        ...initialState,
        streamProvider: { type: 'manual_hls', name: 'HLS', config: {} },
      };
      const result = normalizePayloadLocal({ viewerCount: 100 }, current);
      expect(result.streamProvider?.type).toBe('manual_hls');
    });
  });
});
