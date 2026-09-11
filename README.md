# CampusBoard 📌

> **A simple, collaborative college notice board for students, clubs, and campus teams.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-222?logo=github)](https://manansamal.github.io/campus-board/)

## 🌐 Live Demo

**https://manansamal.github.io/campus-board/**

CampusBoard is a mini full-stack-style project designed to make everyday college announcements easier to discover and share. It brings events, academic updates, sports, opportunities, lost-and-found posts, and community notices into one clean interface.

## ✨ Features

- Create new campus notices
- Edit existing notices
- Delete notices
- Like notices
- Search by title, message, or author
- Filter by category
- Responsive design for desktop and mobile
- Loading, empty, and error states
- Client-side form validation
- Supabase PostgreSQL database integration
- Row Level Security policies
- Demo-data fallback when Supabase is not configured
- Automatic deployment to GitHub Pages with GitHub Actions

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework and static site build |
| **React 19** | User interface and state management |
| **TypeScript** | Type-safe development |
| **Supabase** | PostgreSQL database and persistence |
| **CSS** | Responsive visual design |
| **GitHub Actions** | Automated GitHub Pages deployment |
| **GitHub Pages** | Free static hosting |

## 📁 Project Structure

```text
campus-board/
├── app/
│   ├── globals.css      # Application styling
│   ├── layout.tsx       # Root layout and metadata
│   └── page.tsx         # Notice board, search, filters and CRUD UI
├── lib/
│   └── supabase.ts      # Supabase client
├── supabase/
│   └── schema.sql       # Database table, RLS policies and demo data
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # GitHub Pages CI/CD workflow
├── .env.example         # Required environment variables
├── next.config.ts       # Static export + GitHub Pages configuration
├── package.json
└── README.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/MananSamal/campus-board.git
cd campus-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor.

Then create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

> Never commit a Supabase service-role/secret key to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000**.

### 5. Build the production version

```bash
npm run build
```

The static site is generated in the `out/` directory.

## 🗄️ Database

The Supabase schema creates a `notices` table containing:

- `id` — unique notice ID
- `title` — notice title
- `body` — notice content
- `category` — notice category
- `author` — person or club posting
- `likes` — number of likes
- `created_at` — creation timestamp

Row Level Security is enabled with policies for reading, creating, updating, and deleting notices.

## 🌍 GitHub Pages Deployment

This repository is configured to deploy automatically whenever changes are pushed to `main`.

The workflow:

1. Installs Node.js dependencies.
2. Builds the Next.js app as a static export.
3. Injects the Supabase public environment variables from GitHub Actions secrets.
4. Uploads the `out/` directory to GitHub Pages.
5. Publishes the site at:

**https://manansamal.github.io/campus-board/**

### Required GitHub Secrets

For the live Supabase-backed version, add these repository secrets under:

**GitHub → Settings → Secrets and variables → Actions → New repository secret**

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The Supabase URL and publishable/anon key are safe for client-side use when the database is protected by appropriate RLS policies. Do not use the service-role/secret key.

## 🎯 Why I Built This

Campus announcements are often scattered across group chats, emails, and social platforms. CampusBoard explores a small but useful solution: one shared place where students can quickly publish and find important updates.

This project was also built as a practical demonstration of:

- React component and state management
- TypeScript
- CRUD operations
- Database integration
- Search and filtering
- Responsive UI development
- GitHub workflow automation
- Static web deployment

## 🔮 Possible Improvements

- Student authentication with Supabase Auth
- Admin/moderator roles
- Image attachments
- Comments on notices
- Real-time updates
- Email or push notifications
- Notice expiry dates
- Pinned announcements
- Pagination for large campuses

## 👨‍💻 Author

**Manan Samal**

GitHub: [@MananSamal](https://github.com/MananSamal)

Project: [CampusBoard](https://github.com/MananSamal/campus-board)

---

⭐ If you find this project useful, consider giving the repository a star!
