import { useState, useCallback, useRef, useEffect } from 'react';
import { SyncService } from './syncService';

interface UseSyncReturn {
  save: (content: string) => void;
  load: (id: string) => Promise<void>;
  status: 'idle' | 'loading' | 'saving' | 'success' | 'error';
  error: string | null;
  lastSaved: Date | null;
}

export const useSync = (
  mdxSource?: string,
  onChange?: (content: string) => void
): UseSyncReturn => {
  const [status, setStatus] = useState<UseSyncReturn['status']>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const performSave = async (id: string, content: string) => {
    setStatus('saving');
    setError(null);
    try {
      await SyncService.save(id, content);
      setStatus('success');
      setLastSaved(new Date());
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to save');
    }
  };

  const save = useCallback((content: string) => {
    if (onChange) {
      onChange(content);
    }

    if (!activeId) {
      console.warn('Cannot save: no active document ID loaded.');
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSave(activeId, content);
    }, 1000);
  }, [activeId, onChange]);

  const load = useCallback(async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const content = await SyncService.load(id);
      setActiveId(id);
      if (onChange) {
        onChange(content);
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to load');
    }
  }, [onChange]);

  return {
    save,
    load,
    status,
    error,
    lastSaved
  };
};
