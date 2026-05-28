# Context API + useReducer

## What is This Pattern?

Combining **Context API** with **useReducer** creates a powerful, lightweight state management solution similar to Redux but built into React.

**Use this pattern for:**
- ✅ App-wide state (auth, theme, cart, notifications)
- ✅ Complex state logic with multiple actions
- ✅ Avoiding prop drilling
- ✅ Medium-sized apps (before reaching for Redux/Zustand)

---

## Why Combine Context + useReducer?

| Feature | useState + Context | useReducer + Context |
|---------|-------------------|----------------------|
| Simple state | ✅ Perfect | ❌ Overkill |
| Complex state | ❌ Gets messy | ✅ Perfect |
| Multiple actions | ❌ Many setters | ✅ Single dispatch |
| Predictable updates | ❌ Harder | ✅ Easier |
| Testing | ❌ Harder | ✅ Easier (pure reducer) |
| Debugging | ❌ Harder | ✅ Action logs |

---

## Basic Pattern

### 1. Define State and Reducer
```jsx
// Initial state
const initialState = {
  user: null,
  theme: 'light',
  notifications: []
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'LOGOUT':
      return { ...state, user: null };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    default:
      return state;
  }
}
```

### 2. Create Context
```jsx
import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext(null);
```

### 3. Create Provider Component
```jsx
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

### 4. Create Custom Hook
```jsx
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

### 5. Wrap App with Provider
```jsx
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
```

### 6. Use in Components
```jsx
function Header() {
  const { state, dispatch } = useApp();
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };
  
  return (
    <header className={state.theme}>
      {state.user ? (
        <>
          <p>Welcome, {state.user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
      <button onClick={toggleTheme}>
        Toggle Theme ({state.theme})
      </button>
    </header>
  );
}
```

---

## Real-World Example: Shopping Cart

### Complete Implementation
```jsx
import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  total: 0
};

// Action types (constants prevent typos)
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      
      let newItems;
      if (existingItem) {
        // Increase quantity if item exists
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      
      return { items: newItems, total: newTotal };
    }
    
    case ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(
        item => item.id !== action.payload
      );
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }
    
    case ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { items: newItems, total: newTotal };
    }
    
    case ACTIONS.CLEAR_CART:
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
  
  // Action creators (optional but cleaner)
  const addItem = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
  };
  
  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  };
  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ 
        type: ACTIONS.UPDATE_QUANTITY, 
        payload: { id, quantity } 
      });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };
  
  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
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
```

### Using the Cart
```jsx
// Product Card
function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// Cart Display
function Cart() {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  
  if (items.length === 0) {
    return <p>Your cart is empty</p>;
  }
  
  return (
    <div className="cart">
      <h2>Cart ({itemCount} items)</h2>
      
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
          
          <div>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
          </div>
          
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={clearCart}>Clear Cart</button>
        <button>Checkout</button>
      </div>
    </div>
  );
}

// Cart Badge (in navbar)
function CartBadge() {
  const { itemCount } = useCart();
  
  return (
    <div className="cart-badge">
      🛒 {itemCount > 0 && <span className="badge">{itemCount}</span>}
    </div>
  );
}
```

---

## Auth Context Example

```jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  user: null,
  loading: true,
  error: null
};

const ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING'
};

function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null };
    
    case ACTIONS.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    
    case ACTIONS.LOGIN_FAILURE:
      return { user: null, loading: false, error: action.payload };
    
    case ACTIONS.LOGOUT:
      return { user: null, loading: false, error: null };
    
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, []);
  
  const fetchUser = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Invalid token');
      
      const user = await response.json();
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
    } catch (err) {
      localStorage.removeItem('token');
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err.message });
    }
  };
  
  const login = async (email, password) => {
    dispatch({ type: ACTIONS.LOGIN_START });
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Invalid credentials');
      
      const { user, token } = await response.json();
      localStorage.setItem('token', token);
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
    } catch (err) {
      dispatch({ type: ACTIONS.LOGIN_FAILURE, payload: err.message });
      throw err;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: ACTIONS.LOGOUT });
  };
  
  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    login,
    logout
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
```

### Using Auth Context
```jsx
// Login Page
function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in context
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Protected Route
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

// User Profile
function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Multiple Contexts

### Combining Multiple Providers
```jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* routes */}
              </Routes>
            </Router>
          </NotificationProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

### Using Multiple Contexts
```jsx
function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { notifications } = useNotifications();
  
  return (
    <header className={theme}>
      <div>Welcome, {user?.name}</div>
      <div>Cart: {itemCount}</div>
      <div>Notifications: {notifications.length}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
```

---

## Best Practices

### 1. Use Action Constants
```jsx
// ✅ GOOD - prevents typos
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM'
};

dispatch({ type: ACTIONS.ADD_ITEM, payload: item });

// ❌ BAD - typos cause bugs
dispatch({ type: 'ADD_ITME', payload: item }); // Typo!
```

### 2. Create Action Creators
```jsx
// ✅ GOOD - cleaner API
const addItem = (item) => {
  dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
};

addItem(product);

// ❌ BAD - verbose
dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
```

### 3. Keep Reducers Pure
```jsx
// ✅ GOOD - pure function
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}

// ❌ BAD - side effects
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      console.log('Adding'); // Side effect!
      fetch('/api/log');     // Side effect!
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

### 4. Split Large Contexts
```jsx
// ✅ GOOD - separate concerns
<AuthProvider>
  <ThemeProvider>
    <CartProvider>

// ❌ BAD - one giant context
<AppProvider> // Contains auth, theme, cart, notifications, etc.
```

### 5. Memoize Context Values
```jsx
import { useMemo } from 'react';

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // ✅ Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    items: state.items,
    total: state.total,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  }), [state.items, state.total]);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

---

## When to Use This Pattern

### ✅ Use Context + useReducer when:
- App-wide state (auth, theme, cart)
- Complex state with multiple actions
- State logic is reused across components
- Medium-sized apps

### ❌ Don't use when:
- Simple local state (use useState)
- Frequently changing values (causes re-renders)
- Very large apps (consider Redux/Zustand)
- Server state (use React Query/SWR)

---

## Quick Reference

```jsx
// 1. Define reducer
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* changes */ };
    default:
      return state;
  }
}

// 2. Create context
const MyContext = createContext(null);

// 3. Provider
export function MyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}

// 4. Custom hook
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within Provider');
  return context;
}

// 5. Use in components
const { state, dispatch } = useMyContext();
dispatch({ type: 'ACTION_TYPE', payload: data });
```
