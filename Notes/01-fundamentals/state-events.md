# State & Event Handling

## What it is
State is local data that a component owns and can change over time. When state changes, React re-renders the component. Events let you respond to user interactions.

## Syntax / Usage
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);

  return <button onClick={increment}>Count: {count}</button>;
}

// Input state
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
```

## When to use
- State: any data that changes and should trigger a re-render
- Events: onClick, onChange, onSubmit, onBlur, onFocus, etc.

## Gotchas
- Always use the setter function, never mutate state directly
- State updates are asynchronous — use functional updates `prev => prev + 1` when new state depends on old
- Each component instance has its own state

## My notes / examples

