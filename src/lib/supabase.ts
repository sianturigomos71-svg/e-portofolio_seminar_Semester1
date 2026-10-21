import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kscjelcqqcpnunonygnk.supabase.co';
export const supabaseAnonKey = 'sb_publishable_NaRc5bl6IoaSbgbM-2lqsw_LpwEVDYE';

export const REFLECTION_BUCKET = 'reflection_documents';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
