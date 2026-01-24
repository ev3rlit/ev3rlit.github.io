import { supabase } from '@/shared/lib/supabase';

export interface Document {
  id: string;
  content: string;
  updated_at: string;
}

export const SyncService = {
  async save(id: string, content: string): Promise<void> {
    const { error } = await supabase.from('documents').upsert({
      id,
      content,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }
  },

  async load(id: string): Promise<string> {
    const { data, error } = await supabase
      .from('documents')
      .select('content')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.content;
  },
};
