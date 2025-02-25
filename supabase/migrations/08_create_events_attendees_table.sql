CREATE TYPE invitation_status AS ENUM ('confirmed', 'pending', 'declined');

create table
  public.events_attendees (
    attendee_id uuid not null,
    event_id bigint not null,
    status public.invitation_status not null default 'pending'::invitation_status,
    constraint events_attendees_pkey primary key (attendee_id, event_id),
    constraint events_attendees_event_id_fkey foreign key (event_id) references events (id) on update cascade on delete cascade,
    constraint events_attendees_attendee_id_fkey foreign key (attendee_id) references users (id) on update cascade on delete cascade
  ) tablespace pg_default;