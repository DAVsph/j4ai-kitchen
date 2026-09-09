create extension if not exists pgcrypto;

create type public.user_role as enum ('customer','partner','admin');
create type public.project_status as enum ('draft','qualified','matching','assigned','proposal','signed','in_progress','completed','cancelled');
create type public.assignment_status as enum ('proposed','shared','accepted','declined','expired','selected');

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role public.user_role not null default 'customer', first_name text, last_name text, phone text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.projects (
 id uuid primary key default gen_random_uuid(), reference text unique not null default ('SH-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,8))),
 customer_id uuid not null references public.profiles(id) on delete cascade, status public.project_status not null default 'draft',
 project_type text, room_type text, surface_m2 numeric, style text, details text, budget_min numeric, budget_max numeric, timing text,
 postcode text, city text, latitude double precision, longitude double precision, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.consents (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, customer_id uuid not null references public.profiles(id) on delete cascade,
 purpose text not null, granted boolean not null, policy_version text not null, consent_text text not null, granted_at timestamptz not null default now()
);
create table public.stores (
 id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id), name text not null, slug text unique not null, address text, postcode text, city text,
 latitude double precision, longitude double precision, coverage_km integer default 30, active boolean not null default true, subscription_starts_at timestamptz,
 free_until timestamptz, monthly_fee_cents integer not null default 2000, success_fee_bps integer not null default 500, created_at timestamptz not null default now()
);
create table public.store_capabilities (
 id uuid primary key default gen_random_uuid(), store_id uuid not null references public.stores(id) on delete cascade, room_type text not null, min_budget numeric, max_budget numeric, installation boolean default true, unique(store_id,room_type)
);
create table public.project_matches (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, store_id uuid not null references public.stores(id) on delete cascade,
 score numeric(5,2) not null, distance_score numeric(5,2), fit_score numeric(5,2), availability_score numeric(5,2), performance_score numeric(5,2), quality_score numeric(5,2), created_at timestamptz not null default now(), unique(project_id,store_id)
);
create table public.project_assignments (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, store_id uuid not null references public.stores(id) on delete cascade,
 status public.assignment_status not null default 'proposed', match_score numeric(5,2), shared_at timestamptz, responded_at timestamptz, selected_at timestamptz, created_at timestamptz not null default now(), unique(project_id,store_id)
);
create table public.media (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, uploaded_by uuid references public.profiles(id), kind text not null, storage_path text not null, mime_type text, created_at timestamptz not null default now()
);
create table public.proposals (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, store_id uuid not null references public.stores(id) on delete cascade, title text, notes text, amount_ht numeric, status text not null default 'draft', created_at timestamptz not null default now()
);
create table public.orders (
 id uuid primary key default gen_random_uuid(), project_id uuid unique not null references public.projects(id), store_id uuid not null references public.stores(id), proposal_id uuid references public.proposals(id), amount_ht numeric not null,
 spacehome_fee_rate numeric(5,4) not null default .05, spacehome_fee_ht numeric generated always as (round(amount_ht * spacehome_fee_rate,2)) stored, status text not null default 'pending', payment_provider text, payment_reference text, created_at timestamptz not null default now()
);
create table public.milestones (
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, position integer not null, name text not null, status text not null default 'pending', amount numeric, validated_at timestamptz, unique(order_id,position)
);
create table public.insurance_cases (
 id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, provider text, policy_reference text, status text not null default 'pending', claim_reference text, created_at timestamptz not null default now()
);

create or replace function public.enforce_max_three_assignments() returns trigger language plpgsql as $$ begin
 if (select count(*) from public.project_assignments where project_id=new.project_id and status in ('proposed','shared','accepted','selected')) >= 3 then raise exception 'A project can have at most 3 active boutique assignments'; end if; return new; end $$;
create trigger max_three_assignments before insert on public.project_assignments for each row execute function public.enforce_max_three_assignments();

alter table public.profiles enable row level security; alter table public.projects enable row level security; alter table public.consents enable row level security; alter table public.stores enable row level security; alter table public.store_capabilities enable row level security; alter table public.project_matches enable row level security; alter table public.project_assignments enable row level security; alter table public.media enable row level security; alter table public.proposals enable row level security; alter table public.orders enable row level security; alter table public.milestones enable row level security; alter table public.insurance_cases enable row level security;

create policy "profile own read" on public.profiles for select using (auth.uid()=id);
create policy "profile own update" on public.profiles for update using (auth.uid()=id);
create policy "customer project read" on public.projects for select using (customer_id=auth.uid());
create policy "customer project create" on public.projects for insert with check (customer_id=auth.uid());
create policy "customer project update" on public.projects for update using (customer_id=auth.uid());
create policy "customer consent" on public.consents for all using (customer_id=auth.uid()) with check (customer_id=auth.uid());
create policy "active stores readable" on public.stores for select using (active=true);
create policy "store capabilities readable" on public.store_capabilities for select using (exists(select 1 from public.stores s where s.id=store_id and s.active=true));
create policy "customer assignments read" on public.project_assignments for select using (exists(select 1 from public.projects p where p.id=project_id and p.customer_id=auth.uid()));
create policy "customer media" on public.media for select using (exists(select 1 from public.projects p where p.id=project_id and p.customer_id=auth.uid()));
create policy "customer proposals" on public.proposals for select using (exists(select 1 from public.projects p where p.id=project_id and p.customer_id=auth.uid()));
create policy "customer orders" on public.orders for select using (exists(select 1 from public.projects p where p.id=project_id and p.customer_id=auth.uid()));
create policy "customer milestones" on public.milestones for select using (exists(select 1 from public.orders o join public.projects p on p.id=o.project_id where o.id=order_id and p.customer_id=auth.uid()));
