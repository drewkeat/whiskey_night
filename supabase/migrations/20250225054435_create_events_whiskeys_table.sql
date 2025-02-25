create table
  public.events_whiskeys (
    event_id bigint not null,
    whiskey integer not null,
    constraint events_whiskeys_pkey primary key (event_id, whiskey),
    constraint events_whiskeys_event_id_fkey foreign key (event_id) references events (id) on update cascade on delete cascade,
    constraint events_whiskeys_whiskey_fkey foreign key (whiskey) references whiskeys (id) on update cascade on delete restrict
  ) tablespace pg_default;