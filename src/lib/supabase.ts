import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_KEY; // backwards compat

if (!url || !key) {
  // Warn but do not throw at module-scope — evita partir toda a app se as env vars
  // estiverem em falta. Chamadas a `supabase.auth.*` vão falhar com erro claro.
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY em falta. Auth desativado.'
  );
}

export const supabase: SupabaseClient = createClient(
  url ?? 'http://localhost:54321',
  key ?? 'public-anon-key-missing'
);
