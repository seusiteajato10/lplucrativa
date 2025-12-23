import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iwirhszysqvfkjdrgswa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aXJoc3p5c3F2ZmtqZHJnc3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTEwOTksImV4cCI6MjA4MjAyNzA5OX0.M5Y_dMfSfmE33mmxwown4IhisUUoWHrpcoyuvBIFlfk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * @deprecated Este export existe apenas para compatibilidade com cache antigo do navegador.
 * Não use em código novo.
 */
export const supabaseConfigStorageKey = "sb-config";
