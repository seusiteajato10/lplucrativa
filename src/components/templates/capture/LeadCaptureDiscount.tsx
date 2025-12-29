create table leads (
  id uuid default gen_random_uuid() primary key,
  project_id text not null,
  user_id text not null,
  name text not null,
  email text not null,
  whatsapp text,
  source_slug text,
  offer_type text,
  created_at timestamp with time zone default now()
);
