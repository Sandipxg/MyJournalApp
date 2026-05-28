# Custom Hooks

## What are Custom Hooks?

**Custom hooks** are JavaScript functions that:
- Start with `use` (naming convention)
- Can call other hooks inside them
- Encapsulate reusable stateful logic
- Let you share logic between components

**Benefits:**
- ✅ Reuse stateful logic across components
- ✅ Keep components clean and focused
- ✅ Easier to test
- ✅ Better code organization

---

## Creating Custom Hooks

### Basic Structure
```jsx
import { useState, useEffect } from 'react';

function useCustomHook() {
  // Use built-in hooks
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  // Return values/functions
  return { state, setState };
}
```

---

## Common Custom Hooks

### 1. useFetch - Data Fetching
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <div>{user.name}</div>;
}
```

### 2. useLocalStorage - Persist State
```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 3. useToggle - Boolean State
```jsx
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return [value, toggle, setTrue, setFalse];
}

// Usage
function Modal() {
  const [isOpen, toggle, open, close] = useToggle(false);
  
  return (
    <div>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### 4. useDebounce - Delay Updates
```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage - Search with debounce
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      // API call only happens after user stops typing for 500ms
      fetch(`/api/search?q=${debouncedSearch}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      value={searchTerm} 
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### 5. useWindowSize - Responsive Design
```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

### 6. useOnClickOutside - Close on Outside Click
```jsx
import { useEffect, useRef } from 'react';

function useOnClickOutside(callback) {
  const ref = useRef(null);
  
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);
  
  return ref;
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOnClickOutside(() => setIsOpen(false));
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <div className="dropdown-menu">
          <p>Dropdown content</p>
        </div>
      )}
    </div>
  );
}
```

### 7. usePrevious - Track Previous Value
```jsx
import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 8. useInterval - Declarative Intervals
```jsx
import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay === null) return;
    
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    
    return () => clearInterval(id);
  }, [delay]);
}

// Usage
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  useInterval(() => {
    setSeconds(seconds + 1);
  }, isRunning ? 1000 : null); // Pass null to pause
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

### 9. useForm - Form State Management
```jsx
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = (callback, validate) => (e) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    
    callback(values);
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset
  };
}

// Usage
function LoginForm() {
  const { values, errors, handleChange, handleSubmit, reset } = useForm({
    email: '',
    password: ''
  });
  
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };
  
  const onSubmit = (values) => {
    console.log('Submitting:', values);
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit, validate)}>
      <input 
        name="email" 
        value={values.email} 
        onChange={handleChange} 
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input 
        name="password" 
        type="password"
        value={values.password} 
        onChange={handleChange} 
      />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### 10. useAsync - Async Operations
```jsx
import { useState, useEffect, useCallback } from 'react';

function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback(async (...params) => {
    setStatus('pending');
    setData(null);
    setError(null);
    
    try {
      const response = await asyncFunction(...params);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return { execute, status, data, error, loading: status === 'pending' };
}

// Usage
function UserProfile({ userId }) {
  const fetchUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    return res.json();
  };
  
  const { data: user, loading, error } = useAsync(fetchUser, true);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <div>{user.name}</div>;
}
```

---

## Custom Hook Best Practices

### 1. Always Start with "use"
```jsx
// ✅ GOOD
function useCounter() { ... }
function useFetch() { ... }

// ❌ BAD
function counter() { ... }
function fetchData() { ... }
```

### 2. Return Values Consistently
```jsx
// ✅ GOOD - array for simple hooks
function useToggle() {
  return [value, toggle];
}

// ✅ GOOD - object for complex hooks
function useFetch() {
  return { data, loading, error, refetch };
}
```

### 3. Keep Hooks Focused
```jsx
// ✅ GOOD - single responsibility
function useFetch(url) { ... }
function useLocalStorage(key) { ... }

// ❌ BAD - doing too much
function useEverything() {
  // Fetching, local storage, auth, theme, etc.
}
```

### 4. Handle Cleanup
```jsx
function useEventListener(eventName, handler) {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    
    // ✅ Always cleanup
    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}
```

---

## Real-World Example: usePosts (from your app)

```jsx
import { useState, useEffect } from 'react';

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);
  
  const addPost = async (newPost) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      const data = await res.json();
      setPosts(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  
  return { posts, loading, error, addPost, deletePost };
}

// Usage
function JournalPage() {
  const { posts, loading, error, addPost, deletePost } = usePosts();
  
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      {posts.map(post => (
        <JournalCard 
          key={post.id} 
          post={post}
          onDelete={() => deletePost(post.id)}
        />
      ))}
    </div>
  );
}
```

---

## Quick Reference

```jsx
// Basic structure
function useCustomHook(params) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  return { state, setState };
}

// Usage
const { state, setState } = useCustomHook(params);
```

---

## When to Create Custom Hooks

✅ Create a custom hook when:
- You're repeating the same stateful logic in multiple components
- Logic is complex and clutters your component
- You want to share logic across your app
- You want to test logic independently

❌ Don't create a custom hook when:
- Logic is used in only one place
- It's just a simple function (doesn't use hooks)
- It makes code harder to understand
