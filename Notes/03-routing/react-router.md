# React Router

## What it is
Client-side routing library for React. Lets you map URLs to components without full page reloads.

## Syntax / Usage
```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams } from "react-router-dom";

// Setup
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/journal" element={<Journalpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/settings" element={<Settingpage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigation
<Link to="/journal">Journal</Link>
<NavLink to="/journal" className={({ isActive }) => isActive ? "active" : ""}>Journal</NavLink>

// Programmatic navigation
const navigate = useNavigate();
navigate("/journal");
navigate(-1); // go back

// Dynamic routes
<Route path="/post/:id" element={<PostDetail />} />
const { id } = useParams();

// Nested routes
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />
  <Route path="stats" element={<Stats />} />
</Route>
// Use <Outlet /> in Dashboard to render child routes
```

## When to use
- Any multi-page React app
- Use `NavLink` for nav bars (gives active class automatically)
- Use `useNavigate` for redirects after form submit, login, etc.

## Gotchas
- Wrap everything in `<BrowserRouter>` once at the top level
- `<Route path="*">` is your 404 catch-all — put it last
- `useParams`, `useNavigate` only work inside the Router context

## My notes / examples
- Journal app uses Routes for Homepage, Journalpage, Loginpage, Settingpage

