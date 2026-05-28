# useContext

## What is Context API?

The **Context API** lets you share data across the component tree without passing props through every level (avoiding "prop drilling").

**Use Context for:**
- Global/shared state (theme, auth user, language)
- Data needed by many components at different nesting levels
- Avoiding prop drilling

---

## The Problem: Prop Drilling

```jsx
// ❌ Prop drilling - passing props through many levels
function App() {
  const [user, setUser] = useState({ name: 'Alex' });
  
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <UserProfile user={user} setUser={setUser} />;
}

function UserProfile({ user, setUser }) {
  return <p>{user.name}</p>;
}
```

---

## The Solution: Context API

### Step 1: Create Context
```jsx
import { createContext } from 'react';

const UserContext = createContext(null);
```

### Step 2: Provide Context Value
```jsx
function App() {
  const [user, setUser] = useState({ name: 'Alex' });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

### Step 3: Consume Context with useContext
```jsx
import { useContext } from 'react';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  
  return <p>{user.name}</p>;
}
```

---

## Complete Example: Theme Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext(null);

// 2. Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for easy access
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

// 5. Use anywhere in the tree
function Page() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme}>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

---

## Multiple Contexts

You can use multiple contexts in the same app:

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Dashboard />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Use multiple contexts in a component
function Header() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();
  
  return (
    <header className={theme}>
      <p>{user.name}</p>
      <p>Language: {language}</p>
    </header>
  );
}
```

---

## Auth Context Example

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(setUser).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = async (email, password) => {
    const { user, token } = await api.login(email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Context with useReducer

Combine Context with useReducer for more complex state management:

```jsx
import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  cart: [],
  total: 0
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newCart = [...state.cart, action.payload];
      return {
        cart: newCart,
        total: newCart.reduce((sum, item) => sum + item.price, 0)
      };
    
    case 'REMOVE_ITEM':
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      return {
        cart: filteredCart,
        total: filteredCart.reduce((sum, item) => sum + item.price, 0)
      };
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

// Context
const CartContext = createContext(null);

// Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  
  const value = {
    cart: state.cart,
    total: state.total,
    addItem,
    removeItem,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Usage
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}

function Cart() {
  const { cart, total, removeItem, clearCart } = useCart();
  
  return (
    <div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${total}</p>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

---

## Context Best Practices

### 1. Create Custom Hooks
```jsx
// ✅ GOOD - custom hook with error handling
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
const { theme } = useTheme(); // Clean and safe

// ❌ BAD - direct useContext everywhere
const context = useContext(ThemeContext);
if (!context) throw new Error('...');
```

### 2. Split Large Contexts
```jsx
// ❌ BAD - one giant context
const AppContext = createContext({
  user, theme, language, cart, notifications, settings, ...
});

// ✅ GOOD - separate contexts
<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
</AuthProvider>
```

### 3. Memoize Context Values
```jsx
import { useMemo } from 'react';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // ✅ Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 4. Provide Default Values
```jsx
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {}
});
```

---

## Common Patterns

### Loading State in Provider
```jsx
function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
```

### Conditional Rendering Based on Context
```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

// Usage
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## Performance Considerations

### Problem: All Consumers Re-render
```jsx
// ❌ Every consumer re-renders when ANY value changes
const value = { user, theme, cart, notifications };

<AppContext.Provider value={value}>
  {children}
</AppContext.Provider>
```

### Solution 1: Split Contexts
```jsx
// ✅ Only theme consumers re-render when theme changes
<UserContext.Provider value={user}>
  <ThemeContext.Provider value={theme}>
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>
```

### Solution 2: Use React.memo
```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  const { theme } = useTheme();
  // Only re-renders when theme changes
  return <div className={theme}>...</div>;
});
```

---

## When NOT to Use Context

❌ Don't use Context for:
- Frequently changing values (use state management library instead)
- Props that only go 1-2 levels deep (just pass props)
- Performance-critical data (Context causes all consumers to re-render)

✅ Use Context for:
- Theme, language, auth user
- Data needed by many components
- Avoiding prop drilling (3+ levels)

---

## Quick Reference

```jsx
// 1. Create context
const MyContext = createContext(defaultValue);

// 2. Provider
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>

// 3. Consumer
const value = useContext(MyContext);

// 4. Custom hook pattern
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}
```

---

## Real-World Example: Multi-Language App

```jsx
import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    settings: 'Settings'
  },
  es: {
    welcome: 'Bienvenido',
    logout: 'Cerrar sesión',
    settings: 'Configuración'
  },
  fr: {
    welcome: 'Bienvenue',
    logout: 'Déconnexion',
    settings: 'Paramètres'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => translations[language][key] || key;
  
  const value = {
    language,
    setLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

// Usage
function Header() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <header>
      <h1>{t('welcome')}</h1>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <button>{t('logout')}</button>
    </header>
  );
}
```
