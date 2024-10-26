-- -- create profiles table
-- create table public.profiles (
--   id uuid not null references auth.users on delete cascade,
--   firstName text,
--   lastName text,
--   email text,

--   primary key (id)
-- );

-- alter table public.profiles enable row level security;

-- -- inserts a row into public.profiles
-- create function public.handle_new_user()
-- returns trigger
-- language plpgsql
-- security definer set search_path = ''
-- as $$
-- begin
--   insert into public.profiles (id, firstName, lastName, email)
--   values (new.id, new.raw_user_meta_data ->> 'firstName', new.raw_user_meta_data ->> 'lastName', new.email);
--   return new;
-- end;
-- $$;

-- -- trigger the function every time a user is created
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

