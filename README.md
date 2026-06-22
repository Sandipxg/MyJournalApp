# MyJournalApp

A personal journal web app built with React (frontend) and Node.js/Express (backend). It features routing, context state management, dark mode, rate limiting, and full PWA offline support.

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
3. Create a `.env` file inside `backend/` (copy from template if available):
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/myjournal
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Run the development server (auto-reloads on file changes):
   ```bash
   npm run dev
   ```

#### Swagger API Docs Documentation
The backend uses `swagger-ui-express` and `swagger-autogen` to generate interactive documentation.
* **Access interactive docs:** Run the backend server and visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
* **Regenerate Swagger JSON:** If you modify API endpoints/routes, regenerate the schema file with:
  ```bash
  npm run swagger
  ```

---

### 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Visit the frontend application at [http://localhost:5173/](http://localhost:5173/).

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

## Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **State Management:** React Context API & hooks

### Backend
- **Server:** Node.js + Express
- **Database:** MongoDB (Mongoose ORM)
- **Security:** Helmet, CORS, Cookie Parser
- **Rate Limiting:** IP-based strict limits for auth routes, global limits for other routes
- **Documentation:** Swagger (OpenAPI)

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
│   ├── controllers/        # Route logic
│   ├── middleware/         # Auth verification & error handling
│   ├── routes/             # Express routes
│   └── swagger/            # OpenAPI definitions & JSON schema
```

