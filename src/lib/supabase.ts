import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ReflectionDocument {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  file_name: string;
  file_size: number;
  storage_path: string;
  upload_date: string;
  updated_at: string;
}

export const REFLECTION_BUCKET = 'reflection_pdfs';
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
