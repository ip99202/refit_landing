-- 리핏 랜딩 신청 테이블
create table applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  birth_date text not null,
  phone text not null,
  gender text not null check (gender in ('남', '여')),
  created_at timestamptz default now()
);

-- RLS: 익명 insert 허용 (랜딩 신청용)
alter table applications enable row level security;
create policy "Allow anonymous insert" on applications for insert with check (true);
