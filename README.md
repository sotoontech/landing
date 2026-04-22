# Sotoon Tech — Landing + CMS

Next.js 15 landing page with a built-in content management backend and admin panel.

## Features

- **Dynamic content**: Text, images, team members, portfolio, testimonials — all editable from the admin panel.
- **Bilingual**: Persian (fa) and English (en) content, each managed independently.
- **Admin panel** at `/admin`:
  - Section-by-section forms for every part of every page
  - Media library with upload / browse / delete
  - Contact messages viewer (read/unread, delete)
  - Raw JSON editor for power edits
- **Docker-ready**: single-command deploy with SQLite volume + uploads volume.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + SQLite (file-based, docker-volume-friendly)
- JWT session (jose) in httpOnly cookie
- bcrypt for admin password hashing

## Quick start (Docker)

```bash
# 1. Set your secrets (or use defaults for dev)
cp .env.example .env
# edit .env and set JWT_SECRET, ADMIN_PASSWORD

# 2. Build & run
docker compose up -d --build

# 3. Open
#   Site:  http://localhost:3000
#   Admin: http://localhost:3000/admin  (username/password from .env)
```

The first startup runs `prisma db push` and seeds the DB from the existing
`src/i18n/dictionaries/fa.json` and `en.json` files, then starts the server.
Subsequent startups skip re-seeding (upsert) and preserve your edits.

### Volumes

- `sotoon-db` → `/app/data/sotoon.db` (the SQLite database)
- `sotoon-uploads` → `/app/public/uploads` (user-uploaded images)

## Local development

```bash
npm install           # or bun install
cp .env.example .env
npx prisma db push    # create the SQLite file
npm run db:seed       # seed from dictionaries + create admin user
npm run dev           # http://localhost:3000
```

## Admin panel

- Visit `/admin` and log in with the credentials from `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
- Switch locales (fa / en) at the top of the **Content** page.
- Each tab edits a specific section. Click **Save changes** to persist to the DB.
- **Media library** holds every uploaded image. Click an image anywhere (pickers, media library) to copy its path.
- **Messages** shows everything submitted through the contact form.

Changes appear immediately — landing pages render fresh on every request
(`export const dynamic = "force-dynamic"`).

## API reference

| Method | Path                          | Auth | Purpose                        |
|--------|-------------------------------|------|--------------------------------|
| GET    | `/api/content/:locale`        | —    | Public content feed            |
| POST   | `/api/contact`                | —    | Submit contact form            |
| POST   | `/api/admin/auth/login`       | —    | Log in                         |
| POST   | `/api/admin/auth/logout`      | —    | Log out                        |
| GET    | `/api/admin/auth/me`          | ✓    | Session probe                  |
| GET    | `/api/admin/content/:locale`  | ✓    | Editor content                 |
| PUT    | `/api/admin/content/:locale`  | ✓    | Save content                   |
| POST   | `/api/admin/upload`           | ✓    | Upload an image                |
| GET    | `/api/admin/uploads`          | ✓    | List uploads                   |
| DELETE | `/api/admin/uploads/:id`      | ✓    | Remove upload                  |
| GET    | `/api/admin/messages`         | ✓    | Contact messages               |
| PATCH  | `/api/admin/messages/:id`     | ✓    | Toggle read flag               |
| DELETE | `/api/admin/messages/:id`     | ✓    | Delete message                 |

## Environment variables

| Variable           | Default                          | Description                          |
|--------------------|----------------------------------|--------------------------------------|
| `DATABASE_URL`     | `file:./data/sotoon.db`          | Prisma connection string             |
| `JWT_SECRET`       | *(required in prod)*             | Signs admin session tokens           |
| `ADMIN_USERNAME`   | `admin`                          | Initial admin username               |
| `ADMIN_PASSWORD`   | `admin`                          | Initial admin password               |
| `UPLOAD_DIR`       | `./public/uploads`               | Where uploaded images are written    |
