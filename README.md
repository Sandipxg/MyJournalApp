# MyJournalApp

A personal, offline-first journal web application built with a modern React frontend and a Node.js/Express backend. 

This repository showcases advanced full-stack development skills, implementing features like native session-based authentication, background cron reminders, web push notifications, and a Progressive Web App (PWA) framework.

---

## Key Features Implemented

* **Modern Authentication (Better Auth)**: Unified credentials (email/username) registration, secure login, and social Google sign-in. Built-in timing-attack-safe session verification and secure, HTTP-only cookie session handling.
* **Progressive Web App (PWA)**: Desktop/mobile standalone app installation, service worker caching, customizable offline-ready web app manifest, and offline assets handling.
* **Offline-First Data Sync**: Full offline capability to view, create, edit, and delete journal entries. Backed by IndexedDB to queue offline database modifications and replay them automatically via Service Worker Background Sync when network connectivity is recovered.
* **Web Push Notifications**: Browser system notifications registration via VAPID keys, enabling scheduled daily push reminders using a background server-side cron scheduler.
* **Interactive API Documentation**: Automated API route definitions and schema generation using Swagger/OpenAPI documentation endpoints.

---

## Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Authentication Client:** Better Auth React SDK
- **Routing:** React Router v7
- **Form Handling:** React Hook Form
- **Styling:** Tailwind CSS v4
- **State Management:** React Context API & custom hooks

### Backend
- **Server:** Node.js + Express (ES Modules)
- **Authentication Engine:** Better Auth (MongoDB Adapter)
- **Database:** MongoDB (Mongoose ORM)
- **Security:** Helmet, CORS, cookie-parser, express-rate-limit
- **Scheduled Tasks:** Node Cron
- **API Documentation:** Swagger UI + Swagger Autogen

---

## Project Setup & Running Locally

The project is split into `frontend/` (React Frontend) and `backend/` (Express API server).

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `backend/` (use the template below):
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 # Optional DNS servers fallback
   VAPID_PUBLIC_KEY=your_vapid_public_key
   VAPID_PRIVATE_KEY=your_vapid_private_key
   BETTER_AUTH_SECRET=your_super_secret_session_key # Generate with: openssl rand -hex 32
   BETTER_AUTH_URL=http://localhost:3000 # Backend server URL
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

#### Swagger API Docs
* **Access interactive docs:** Run the backend server and visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
* **Regenerate Swagger JSON:** If you modify API endpoints/routes, regenerate the schema file with:
   ```bash
   npm run swagger
   ```

### 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `frontend/` (or rely on default fallback):
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Visit the application at [http://localhost:5173/](http://localhost:5173/).

---

## Progressive Web App (PWA) Offline Integration

This application is fully PWA-ready, offering standalone application installation and complete offline caching of resources.

### Important: Modifying Cached Assets & Manual Updates
The PWA uses a custom, manual Service Worker implementation located in `public/sw.js`. 

> [!WARNING]
> Because static assets are cached using a **Cache-First** strategy, browsers will serve the older cached versions of files (HTML, CSS, JS, icons) until the service worker is updated.
> 
> **Whenever you update any front-end assets, app source files, or logos:**
> You must manually increment the version tag in `public/sw.js` (e.g. from `'journal-cache-v1'` to `'journal-cache-v2'`).
> This triggers the browser to update the worker, cache the new files, and clean up the old cache version on the next load.

```javascript
// public/sw.js
const CACHE_NAME = 'journal-cache-v2'; // Increment this whenever assets change!
```

---

## Project Structure

```
MyJournalApp/
├── frontend/               # React Frontend
│   ├── public/             # Static PWA assets (manifest, sw.js, icons)
│   ├── src/                # React Frontend Source
│   │   ├── components/     # Reusable Components
│   │   ├── context/        # Auth & Theme Global State
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── pages/          # App Pages / Router Views
│   │   └── services/       # API Services
├── backend/                # Node.js Express Backend
│   ├── config/             # DB Connection & Better Auth Config
│   ├── controllers/        # Route Logic / Controllers
│   ├── middleware/         # Custom Middleware (Auth session validation, validate schemas)
│   ├── models/             # Mongoose schemas (User, Journal, push subscriptions)
│   ├── routes/             # Express route mappings
│   ├── services/           # Background Cron & Business logic services
│   └── swagger/            # OpenAPI definitions & JSON schema
└── Notes/                  # Dev documentation & Refactor notes
```
