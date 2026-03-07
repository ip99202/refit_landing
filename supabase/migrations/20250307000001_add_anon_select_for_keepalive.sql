-- Keep-alive용: GitHub Actions에서 applications 테이블 조회 시 anon select 허용
create policy "Allow anonymous select for keepalive" on applications for select using (true);
