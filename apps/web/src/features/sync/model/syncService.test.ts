import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SyncService } from './syncService';
import { supabase } from '@/shared/lib/supabase';

vi.mock('@/shared/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('SyncService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should save content to supabase', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: null });
    (supabase.from as any).mockReturnValue({ upsert: upsertMock });

    await SyncService.save('test-id', 'some content');

    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(upsertMock).toHaveBeenCalledWith({
      id: 'test-id',
      content: 'some content',
      updated_at: expect.any(String),
    });
  });

  it('should load content from supabase', async () => {
    const singleMock = vi.fn().mockResolvedValue({
        data: { content: 'loaded' },
        error: null
    });
    const eqMock = vi.fn().mockReturnValue({ single: singleMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
    (supabase.from as any).mockReturnValue({ select: selectMock });

    const data = await SyncService.load('test-id');

    expect(supabase.from).toHaveBeenCalledWith('documents');
    expect(selectMock).toHaveBeenCalledWith('content');
    expect(eqMock).toHaveBeenCalledWith('id', 'test-id');
    expect(data).toBe('loaded');
  });

  it('should handle save errors', async () => {
    const upsertMock = vi.fn().mockResolvedValue({ error: { message: 'Save failed' } });
    (supabase.from as any).mockReturnValue({ upsert: upsertMock });

    await expect(SyncService.save('test-id', 'content')).rejects.toThrow('Save failed');
  });

  it('should handle load errors', async () => {
    const singleMock = vi.fn().mockResolvedValue({ data: null, error: { message: 'Load failed' } });
    const eqMock = vi.fn().mockReturnValue({ single: singleMock });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });
    (supabase.from as any).mockReturnValue({ select: selectMock });

    await expect(SyncService.load('test-id')).rejects.toThrow('Load failed');
  });
});
