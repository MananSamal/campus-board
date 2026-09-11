# CampusBoard 📌

A clean, responsive collaborative college notice board built with **Next.js, React and Supabase**.

## Features

- Create, edit and delete campus notices
- Search notices instantly
- Filter by category
- Like notices
- Responsive mobile-first interface
- Loading, empty and error states
- Client-side form validation
- Supabase/PostgreSQL persistence with Row Level Security policies
- Demo data fallback so the UI can be explored before database setup

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Supabase / PostgreSQL
- CSS

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Connect Supabase

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase project URL and anon key.
5. Restart the development server.

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Project structure

```text
app/
  globals.css     # responsive UI
  layout.tsx      # metadata and root layout
  page.tsx        # notice board + CRUD UI
lib/
  supabase.ts     # database client
supabase/
  schema.sql      # table, RLS policies and seed data
```

## Submission checklist

- [x] Real backend/database integration
- [x] Responsive interface
- [x] Loading / empty / error states
- [x] Form validation
- [x] Search and filtering
- [x] CRUD interactions
- [x] Likes

Built as a mini collaborative-app project.
