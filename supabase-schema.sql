-- 1. Créer la table "profiles"
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  first_name text,
  last_name text,
  newsletter_optin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Créer la table "purchases" (Achats Lemon Squeezy)
create table public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  variant_id text not null, -- ID du produit/audio sur Lemon Squeezy
  order_id text unique not null,
  status text not null,
  amount text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Créer la table "appointments" (Rendez-vous Calendly)
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_uri text unique not null,
  event_name text not null,
  status text not null default 'active',
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Activer RLS (Sécurité)
alter table public.profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.appointments enable row level security;

-- 5. Autoriser les utilisateurs à voir LEURS propres données
create policy "Les utilisateurs peuvent voir leur profil." on profiles for select using (auth.uid() = id);
create policy "Les utilisateurs peuvent voir leurs achats." on purchases for select using (auth.uid() = user_id);
create policy "Les utilisateurs peuvent voir leurs RDV." on appointments for select using (auth.uid() = user_id);

-- 6. Autoriser les utilisateurs à mettre à jour LEUR profil
create policy "Les utilisateurs peuvent mettre à jour leur profil." on profiles for update using (auth.uid() = id);

-- Les Webhooks (Serveur Node.js protégé par variables d'environnement) vont insérer dans purchases et appointments.
-- On accepte les inserts depuis le service role (qui bypass RLS).

-- 7. Trigger : Quand un utilisateur s'inscrit, insérer une ligne dans 'profiles'
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, newsletter_optin)
  values (
    new.id, 
    new.email,
    coalesce((new.raw_user_meta_data->>'newsletter_optin')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists (to allow script re-run)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
