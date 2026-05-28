# useContext

## What it is
Lets you read and subscribe to a context value without prop drilling. Works with the Context API (createContext + Provider).

## Syntax / Usage
```jsx
import { createContext, useContext, useState } from "react";

// 1. Create context
const ThemeContext = createContext(null);

// 2. Provide it at a high level
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere in the tree
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current: {theme}
    </button>
  );
}
```

## When to use
- Global/shared state: theme, auth user, language, cart
- Avoid prop drilling across many levels

## Gotchas
- Every consumer re-renders when context value changes — keep context values stable or split contexts
- Don't overuse — not a replacement for all state management
- Export a custom hook for cleaner usage: `export const useTheme = () => useContext(ThemeContext);`

## My notes / examples
- Used in ThemeContext.jsx in the journal app

