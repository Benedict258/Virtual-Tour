import { describe, it, expect } from 'vitest';
import { cn } from '../../src/lib/utils';

describe('cn (className merger)', () => {
  it('should merge class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const result = cn('base', true && 'active', false && 'hidden');
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('hidden');
  });

  it('should merge tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-8');
    expect(result).toContain('px-8');
    expect(result).not.toContain('px-4');
    expect(result).toContain('py-2');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle undefined and null', () => {
    const result = cn('foo', undefined, null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle complex tailwind merging', () => {
    const result = cn(
      'text-sm font-bold text-dark',
      'text-lg font-normal',
    );
    expect(result).toContain('text-lg');
    expect(result).toContain('font-normal');
    expect(result).not.toContain('text-sm');
    expect(result).not.toContain('font-bold');
  });
});
