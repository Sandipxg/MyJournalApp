# useState & useEffect

## What it is
- `useState` — manages local component state
- `useEffect` — runs side effects (data fetching, subscriptions, DOM manipulation) after render

## Syntax / Usage
```jsx
import { useState, useEffect } from "react";

// useState
const [value, setValue] = useState(initialValue);

// useEffect — runs after every render
useEffect(() => {
  console.log("rendered");
});

// useEffect — runs once on mount
useEffect(() => {
  fetchData();
}, []);

// useEffect — runs when dependency changes
useEffect(() => {
  fetchPost(id);
}, [id]);

// useEffect — cleanup
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // cleanup on unmount
}, []);
```

## When to use
- `useState`: any local UI state (form inputs, toggles, counters)
- `useEffect`: API calls on mount, syncing with external systems, event listeners

## Gotchas
- Missing dependency array = runs on every render
- Empty `[]` = runs once on mount only
- Stale closures — make sure all values used inside effect are in the dependency array
- Don't call hooks inside loops, conditions, or nested functions

## My notes / examples

