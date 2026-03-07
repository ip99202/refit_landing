# 리핏(re:fit) 모바일 랜딩페이지

Next.js + TypeScript + Tailwind CSS + Supabase

## Supabase 테이블 설정

1. [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택
2. **SQL Editor** → New query
3. 아래 마이그레이션 순서대로 실행 (각각 SQL Editor에 붙여넣기 후 Run):
   - `supabase/migrations/20250307000000_create_applications.sql`
   - `supabase/migrations/20250307000001_add_anon_select_for_keepalive.sql` (Keep-Alive용 select policy)

   이미 1번만 실행한 경우: 2번 마이그레이션만 추가 실행하면 됨.

## Supabase DB Keep-Alive (GitHub Actions)

무료 플랜은 7일 미사용 시 프로젝트가 일시 중지된다. 매일 12:00(KST)에 `applications` 테이블을 조회하는 워크플로우로 이를 방지한다.

**GitHub Secrets 설정** (Repository → Settings → Secrets and variables → Actions):

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://xxx.supabase.co` (.env.local의 `NEXT_PUBLIC_SUPABASE_URL`) |
| `SUPABASE_ANON_KEY` | anon key (.env.local의 `NEXT_PUBLIC_SUPABASE_ANON_KEY`) |

수동 실행: Actions → Supabase DB Keep-Alive → Run workflow

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. GitHub에 푸시 후 [Vercel](https://vercel.com/new)에서 프로젝트 import
2. 환경 변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 배포 후 Supabase Table Editor에서 `applications` 데이터 확인
