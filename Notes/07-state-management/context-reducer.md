# Context API + useReducer

## What it is
Combining React's Context API with `useReducer` gives you a lightweight global state management pattern — similar to Redux but built into React.

## Syntax / Usage
```jsx
import { createContext, useContext, useReducer } from "react";

// 1. Define state shape and reducer
const initialState = { user: null, theme: "light" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":   return { ...state, user: action.payload };
    case "SET_THEME":  return { ...state, theme: action.payload };
    case "LOGOUT":     return { ...state, user: null };
    default: return state;
  }
}

// 2. Create context
const AppContext = createContext(null);

// 3. Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom hook for clean consumption
export function useApp() {
  return useContext(AppContext);
}

// 5. Wrap app
<AppProvider>
  <App />
</AppProvider>

// 6. Use anywhere
function Profile() {
  const { state, dispatch } = useApp();
  return (
    <div>
      <p>{state.user?.name}</p>
      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
    </div>
  );
}
```

## When to use
- App-wide state: auth user, theme, cart, notifications
- When prop drilling becomes painful
- Before reaching for Zustand or Redux

## Gotchas
- All consumers re-render on any state change — split into multiple contexts if needed
- Keep reducer pure — no side effects inside it
- Actions should describe events, not mutations

## My notes / examples

