CREATE TYPE member_role AS ENUM ('member', 'admin');

create table
  public.clubs_members (
    memberid uuid not null,
    clubid bigint not null,
    role public.member_role null default 'member'::member_role,
    constraint clubmembers_pkey primary key (clubid, memberid),
    constraint clubmembers_memberid_fkey foreign key (memberid) references users (id),
    constraint clubs_members_clubid_fkey foreign key (clubid) references clubs (id) on update cascade on delete cascade
  ) tablespace pg_default;