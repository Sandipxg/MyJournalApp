# React Router

## What is React Router?

**React Router** is the standard routing library for React. It enables **client-side routing** - navigating between pages without full page reloads.

**Key Benefits:**
- ✅ Fast navigation (no page reload)
- ✅ Preserves app state
- ✅ Better user experience
- ✅ SEO-friendly (with proper setup)

---

## Installation

```bash
npm install react-router-dom
```

---

## Basic Setup

### 1. Wrap App with BrowserRouter
```jsx
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. Define Routes
```jsx
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

---

## Navigation

### Link Component
```jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### NavLink (with Active State)
```jsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
      
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

---

## Dynamic Routes

### Route Parameters
```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/products/:category/:productId" element={<Product />} />
    </Routes>
  );
}
```

### useParams Hook
```jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <h1>User Profile: {userId}</h1>;
}

function Product() {
  const { category, productId } = useParams();
  
  return (
    <div>
      <p>Category: {category}</p>
      <p>Product ID: {productId}</p>
    </div>
  );
}
```

---

## Programmatic Navigation

### useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard'); // Redirect after login
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Login</button>
    </form>
  );
}

// Navigate with state
function ProductList() {
  const navigate = useNavigate();
  
  const viewProduct = (product) => {
    navigate(`/products/${product.id}`, {
      state: { product } // Pass data
    });
  };
  
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => viewProduct(product)}>
          View {product.name}
        </button>
      ))}
    </div>
  );
}

// Go back/forward
function BackButton() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate(1)}>Go Forward</button>
    </div>
  );
}
```

---

## Query Parameters

### useSearchParams Hook
```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const filter = searchParams.get('filter');
  
  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, filter });
  };
  
  return (
    <div>
      <p>Search: {query}</p>
      <p>Filter: {filter}</p>
      <input 
        value={query || ''} 
        onChange={e => updateSearch(e.target.value)} 
      />
    </div>
  );
}

// URL: /search?q=react&filter=popular
```

---

## Nested Routes

### Parent Route with Outlet
```jsx
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="stats" element={<Stats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/stats">Stats</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

---

## Protected Routes

### Auth Guard Pattern
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### Role-Based Access
```jsx
function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}

// Usage
<Route 
  path="/admin" 
  element={
    <RoleProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </RoleProtectedRoute>
  } 
/>
```

---

## Layout Routes

### Shared Layout
```jsx
function App() {
  return (
    <Routes>
      {/* Routes with navbar */}
      <Route element={<LayoutWithNav />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      
      {/* Routes without navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function LayoutWithNav() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

---

## useLocation Hook

### Access Current Location
```jsx
import { useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  
  return (
    <div>
      <p>Current path: {location.pathname}</p>
      <p>Search params: {location.search}</p>
      <p>Hash: {location.hash}</p>
    </div>
  );
}

// Access passed state
function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  
  return <div>{product?.name}</div>;
}
```

---

## 404 Not Found

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      
      {/* Catch-all route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}
```

---

## Lazy Loading Routes

### Code Splitting
```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Common Patterns

### Redirect After Action
```jsx
function CreatePost() {
  const navigate = useNavigate();
  
  const handleSubmit = async (data) => {
    const newPost = await api.createPost(data);
    navigate(`/posts/${newPost.id}`);
  };
  
  return <PostForm onSubmit={handleSubmit} />;
}
```

### Preserve Scroll Position
```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Add to App
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* routes */}
      </Routes>
    </>
  );
}
```

### Active Link Styling
```jsx
<NavLink
  to="/dashboard"
  className={({ isActive }) => 
    `nav-link ${isActive ? 'active' : ''}`
  }
>
  Dashboard
</NavLink>

// Or with style
<NavLink
  to="/dashboard"
  style={({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? 'blue' : 'black'
  })}
>
  Dashboard
</NavLink>
```

---

## Real-World Example

```jsx
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:postId" element={<BlogPost />} />
        </Route>
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId" element={<PostDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}
```

---

## Quick Reference

```jsx
// Setup
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';

// Basic routing
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>

// Navigation
<Link to="/about">About</Link>
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>

// Hooks
const navigate = useNavigate();
navigate('/dashboard');
navigate(-1); // Go back

const { id } = useParams();
const location = useLocation();
const [searchParams, setSearchParams] = useSearchParams();

// Nested routes
<Route path="/dashboard" element={<Layout />}>
  <Route index element={<Overview />} />
  <Route path="stats" element={<Stats />} />
</Route>

// In Layout component
<Outlet />
```
