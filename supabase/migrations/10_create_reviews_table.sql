create table
  public.reviews (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp without time zone null,
    notes text null,
    whiskey_id integer null,
    constraint reviews_pkey primary key (id),
    constraint reviews_whiskey_id_fkey foreign key (whiskey_id) references whiskeys (id) on update cascade on delete restrict
  ) tablespace pg_default;