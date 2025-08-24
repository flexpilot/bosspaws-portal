import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'
export function createClient(): SupabaseClient { return createClientComponentClient() }