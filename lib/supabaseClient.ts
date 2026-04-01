import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Cliente de Supabase (singleton). Usa `NEXT_PUBLIC_SUPABASE_URL` y
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Lanza si faltan al primer uso.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno.'
    );
  }
  client = createClient(url, anonKey);
  return client;
}

/** Proxy al mismo singleton; equivale a `getSupabase()` (lanza si faltan variables). */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const c = getSupabase();
    const value = Reflect.get(c, prop, c);
    if (typeof value === 'function') {
      return (value as (...a: unknown[]) => unknown).bind(c);
    }
    return value;
  },
});
