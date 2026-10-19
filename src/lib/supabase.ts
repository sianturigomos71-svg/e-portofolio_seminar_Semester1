import { createClient } from '@supabase/supabase-js';

// Ganti URL dengan Project URL proyek Supabase barumu (ada di Settings > API di Supabase)
export const supabaseUrl = 'https://ID_PROYEK_BARU_KAMU.supabase.co';

// Masukkan Publishable Key baru kamu di sini
export const supabaseAnonKey = 'sb_publishable_NaRc5bl6IoaSbgbM-2lqsw_LpwEVDYE';

export const REFLECTION_BUCKET = 'reflection_documents';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
