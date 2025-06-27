import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

//Evitamos exponer las claves privadas en el front
export const BD = createClient(env.SupabaseAuthClient_URL, env.SupabaseAnon_key);