# MyJournalApp

A personal journal web app built with React as a hands-on learning project. Covers core React concepts including routing, context, custom hooks, protected routes, dark mode, and a mock auth system.

## Features

- Signup & Login with per-user session (stored in localStorage)
- Protected routes — journals and settings require authentication
- Create, edit, delete journal entries (per-user ownership enforced)
- Search journals by title
- Dark / Light mode toggle
- Motivational quote on the login page (fetched from external API)
- Error boundaries around the journal list

## Tech Stack

- React 19
- React Router v7
- Tailwind CSS v4
- React Hook Form
- Vite

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ErrorBoundary.jsx
│   ├── JournalCard.jsx
│   ├── JournalForm.jsx
│   ├── JournalList.jsx
│   └── ProtectedRoute.jsx
├── context/           # Global state
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── hooks/             # Custom hooks
│   ├── usePosts.js
│   └── useQuote.js
├── pages/             # Route-level components
│   ├── Homepage.jsx
│   ├── JournalDetailPage.jsx
│   ├── Journalpage.jsx
│   ├── Loginpage.jsx
│   └── Settingpage.jsx
└── services/          # API / data fetching layer
    ├── postService.js
    └── QuoteService.js
```

## Getting Started

```bash
npm install
npm run dev
```

## Architecture Notes

- Auth state lives in `AuthContext` — signup, login, logout, and session restore on refresh
- Journal data is stored in `localStorage` under the `journals` key, each entry tagged with the owner's username
- Fetch logic is separated into `services/` — hooks call services, components call hooks
- `ProtectedRoute` wraps any route that requires authentication, reads from `AuthContext`
- Dark mode is class-based (Tailwind `dark:` variants), toggled via `ThemeContext`

## Concepts Practiced

- JSX, components, props, state
- useState, useEffect, useRef, useReducer, useContext
- Custom hooks
- React Router — dynamic routes, route params, protected routes
- Context API with useReducer
- Error Boundaries
- API service layer pattern
- Mock authentication flow
