-- create users table
create table
  public.users (
    id uuid not null,
    firstname text null,
    lastname text null,
    email text null,
    constraint profile_pkey primary key (id),
    constraint profile_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

-- inserts a row into public.user
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, firstName, lastName, email)
  values (new.id, new.raw_user_meta_data ->> 'firstName', new.raw_user_meta_data ->> 'lastName', new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

