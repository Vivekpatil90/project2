# Verdant — MERN Restaurant Website

A full-stack restaurant website built with **MongoDB, Express, React, Node.js**.

## Features
- 8 fully routed pages (Home, Menu, About, Gallery, Reservations, Contact, Online Order, Blog)
- Scalable Express backend with MVC structure (models / controllers / routes / middleware)
- MongoDB persistence via Mongoose
- React Router v6 client-side routing
- Cart context for online ordering
- Reservation + contact + order forms persisted to backend
- Blog CMS-ready endpoints
- Classic animations (fade, slide, scale, hover-lift) + smooth scroll
- Fresh & modern design system: sage green, cream, black
- Fully responsive, scrollable layout
- Seed script with sample menu + blog posts

## Project Structure
```
mern-restaurant/
├── backend/         # Express + MongoDB API
│   ├── models/      # Mongoose schemas
│   ├── controllers/ # Business logic
│   ├── routes/      # API routes
│   ├── middleware/  # Error handler, validators
│   ├── config/      # DB connection
│   ├── seed/        # Sample data seeder
│   └── server.js
└── frontend/        # React + Vite SPA
    ├── src/
    │   ├── pages/      # 8 page components
    │   ├── components/ # Navbar, Footer, shared UI
    │   ├── context/    # Cart context
    │   ├── api/        # Axios API client
    │   └── styles/     # CSS with design tokens
    └── vite.config.js
```

## Quick Start

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI
npm run seed           # optional: load sample menu + posts
npm run dev            # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

Frontend dev server proxies `/api` → `http://localhost:5000`.

## Environment Variables (backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/verdant
CLIENT_URL=http://localhost:5173
```

## API Endpoints
| Method | Path                    | Purpose                |
|--------|-------------------------|------------------------|
| GET    | /api/menu               | List menu items        |
| GET    | /api/menu/:category     | Filter by category     |
| POST   | /api/menu               | Create item (admin)    |
| GET    | /api/reservations       | List reservations      |
| POST   | /api/reservations       | Book a table           |
| GET    | /api/orders             | List orders            |
| POST   | /api/orders             | Place online order     |
| POST   | /api/contact            | Submit contact form    |
| GET    | /api/blog               | List blog posts        |
| GET    | /api/blog/:slug         | Single post            |

## Tech
- **Backend:** Node 18+, Express 4, Mongoose 8, dotenv, cors, morgan
- **Frontend:** React 18, React Router 6, Vite 5, Axios, Framer Motion

Enjoy! 🌿

---

## v1.1 — JWT Auth & Admin Dashboard

This update adds:

- **JWT authentication** (`/api/auth/signup`, `/api/auth/login`, `/api/auth/me`)
- **`User` model** with bcrypt-hashed passwords and a `role` field (`user` | `admin`)
- **`protect` + `adminOnly` middleware** guarding admin endpoints
- **Admin Dashboard** at `/admin` (frontend route) — view orders, reservations, contact messages, blog posts; confirm/cancel reservations
- **Login** (`/login`) and **Signup** (`/signup`) pages
- A seeded **admin user** (created/updated by `npm run seed`)

### Backend setup

1. `cd backend && npm install`
2. Copy `.env.example` to `.env` and set:
   - `MONGODB_URI`
   - `JWT_SECRET` — **change this** to a long random string
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` — your initial admin
3. `npm run seed` — seeds menu, blog posts, and the admin user
4. `npm run dev`

### Frontend setup

1. `cd frontend && npm install`
2. `npm run dev`
3. Visit `/login`, sign in with the seeded admin credentials, then go to `/admin`.

### Admin login (defaults from `.env.example`)

- Email: `admin@verdant.local`
- Password: `Admin@12345`

> Change these in `.env` **before** running the seed in any real environment.

### Protected endpoints (require `Authorization: Bearer <token>`)

- `GET /api/orders`, `GET /api/orders/:id` — admin
- `GET /api/reservations`, `PATCH /api/reservations/:id/status` — admin
- `GET /api/contact` — admin
- `POST /api/menu`, `PUT /api/menu/:id`, `DELETE /api/menu/:id` — admin
- `POST /api/blog` — admin

Public endpoints (orders, reservations, contact submissions, blog/menu reads) remain open so guests can still place orders, reserve, and contact you.
