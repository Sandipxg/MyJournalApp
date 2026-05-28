# useRef & useReducer

## useRef Hook

### What is useRef?

`useRef` creates a **mutable reference** that:
- ✅ Persists across re-renders
- ✅ Doesn't trigger re-renders when changed
- ✅ Can reference DOM elements
- ✅ Can store any mutable value

**Think of it as:** A box that holds a value that React doesn't watch.

---

## useRef for DOM References

### Accessing DOM Elements
```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus(); // Access DOM element
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Common DOM Operations
```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  
  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  
  return (
    <div>
      <video ref={videoRef} src="video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
```

---

## useRef for Storing Values

### Persisting Values Without Re-renders
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  
  const start = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  
  const reset = () => {
    stop();
    setSeconds(0);
  };
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Tracking Previous Values
```jsx
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

### Counting Renders
```jsx
function Component() {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
  });
  
  return <p>This component rendered {renderCount.current} times</p>;
}
```

---

## useRef vs useState

| Feature | useRef | useState |
|---------|--------|----------|
| Triggers re-render | ❌ No | ✅ Yes |
| Persists across renders | ✅ Yes | ✅ Yes |
| Mutable | ✅ Yes | ❌ No (use setter) |
| Use for UI data | ❌ No | ✅ Yes |
| Use for DOM refs | ✅ Yes | ❌ No |
| Use for timers/intervals | ✅ Yes | ❌ No |

```jsx
function Example() {
  const [count, setCount] = useState(0); // Triggers re-render
  const countRef = useRef(0);            // Doesn't trigger re-render
  
  const increment = () => {
    setCount(count + 1);     // Component re-renders
    countRef.current += 1;   // No re-render
  };
  
  return (
    <div>
      <p>State count: {count}</p>
      <p>Ref count: {countRef.current}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---

## useReducer Hook

### What is useReducer?

`useReducer` is an alternative to `useState` for managing **complex state logic**. It's similar to Redux but built into React.

**Use when:**
- State has multiple sub-values
- Next state depends on previous state
- State transitions are complex

### Basic Syntax
```jsx
import { useReducer } from 'react';

const [state, dispatch] = useReducer(reducer, initialState);
```

**Components:**
1. **reducer**: Function that determines how state changes
2. **initialState**: Starting state value
3. **state**: Current state
4. **dispatch**: Function to trigger state updates

---

## useReducer Examples

### Simple Counter
```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### With Payload
```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - (action.payload || 1) };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'increment', payload: 10 })}>+10</button>
      <button onClick={() => dispatch({ type: 'set', payload: 100 })}>Set to 100</button>
    </div>
  );
}
```

### Todo List with useReducer
```jsx
const initialState = {
  todos: [],
  filter: 'all'
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };
  
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      
      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>All</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>Active</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>Completed</button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## useReducer with Context (Global State)

Combine `useReducer` with Context API for app-wide state management:

```jsx
import { createContext, useContext, useReducer } from 'react';

// Create context
const AppContext = createContext(null);

// Reducer
const initialState = {
  user: null,
  theme: 'light',
  notifications: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy access
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// Usage in components
function Profile() {
  const { state, dispatch } = useApp();
  
  return (
    <div>
      <p>User: {state.user?.name}</p>
      <p>Theme: {state.theme}</p>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        Toggle Theme
      </button>
      <button onClick={() => dispatch({ type: 'LOGOUT' })}>
        Logout
      </button>
    </div>
  );
}
```

---

## useState vs useReducer

| Feature | useState | useReducer |
|---------|----------|------------|
| Simple state | ✅ Best | ❌ Overkill |
| Complex state | ❌ Gets messy | ✅ Best |
| Multiple sub-values | ❌ Multiple states | ✅ Single state object |
| State logic | Inline | Separate reducer function |
| Testing | Harder | Easier (pure function) |
| Debugging | Harder | Easier (action logs) |

```jsx
// useState - good for simple state
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);

// useReducer - good for complex state
const [state, dispatch] = useReducer(reducer, {
  count: 0,
  name: '',
  isOpen: false,
  items: [],
  filter: 'all'
});
```

---

## Reducer Best Practices

### 1. Keep Reducers Pure
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

### 2. Use Action Creators
```jsx
// Action creators
const actions = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' }),
  add: (amount) => ({ type: 'ADD', payload: amount }),
  reset: () => ({ type: 'RESET' })
};

// Usage
dispatch(actions.increment());
dispatch(actions.add(10));
```

### 3. Use Constants for Action Types
```jsx
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    case ACTIONS.RESET:
      return { count: 0 };
    default:
      return state;
  }
}
```

---

## Quick Reference

### useRef
```jsx
const ref = useRef(initialValue);
ref.current = newValue; // Update (no re-render)

// DOM reference
<input ref={inputRef} />
inputRef.current.focus();
```

### useReducer
```jsx
const [state, dispatch] = useReducer(reducer, initialState);

// Dispatch actions
dispatch({ type: 'ACTION_TYPE' });
dispatch({ type: 'ACTION_TYPE', payload: data });

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* changes */ };
    default:
      return state;
  }
}
```

---

## Real-World Example: Form with useReducer

```jsx
const initialState = {
  name: '',
  email: '',
  password: '',
  errors: {},
  isSubmitting: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null }
      };
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload, isSubmitting: false };
    
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    
    case 'SUBMIT_SUCCESS':
      return initialState;
    
    default:
      return state;
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleChange = (field) => (e) => {
    dispatch({ type: 'SET_FIELD', field, value: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    
    try {
      await api.signup(state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SET_ERRORS', payload: err.errors });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={state.name} 
        onChange={handleChange('name')} 
        placeholder="Name"
      />
      {state.errors.name && <span>{state.errors.name}</span>}
      
      <input 
        value={state.email} 
        onChange={handleChange('email')} 
        placeholder="Email"
      />
      {state.errors.email && <span>{state.errors.email}</span>}
      
      <input 
        type="password"
        value={state.password} 
        onChange={handleChange('password')} 
        placeholder="Password"
      />
      {state.errors.password && <span>{state.errors.password}</span>}
      
      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
}
```
