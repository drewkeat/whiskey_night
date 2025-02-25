create table
  public.whiskeys (
    id serial not null,
    name text not null,
    type text null,
    distillery text null,
    location text null,
    description text null,
    "whiskeyImg" text null,
    "whiskeyLink" text null,
    age text null,
    abv text null,
    style text null,
    "caskType" text null,
    "flavorProfile" jsonb null,
    "createdAt" timestamp without time zone null default now(),
    "updatedAt" timestamp without time zone null,
    constraint whiskey_pkey primary key (id),
    constraint whiskey_name_key unique (name)
  ) tablespace pg_default;