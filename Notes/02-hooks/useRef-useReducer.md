# useRef & useReducer

## What it is
- `useRef` — holds a mutable value that doesn't trigger re-renders, or references a DOM element
- `useReducer` — manages complex state logic with a reducer function (like a mini Redux)

## Syntax / Usage
```jsx
import { useRef, useReducer } from "react";

// useRef — DOM reference
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// useRef — persisting value without re-render
const renderCount = useRef(0);
renderCount.current += 1;

// useReducer
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return initialState;
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "increment" });
```

## When to use
- `useRef`: focus management, storing previous values, integrating with non-React libraries
- `useReducer`: when state has multiple sub-values or next state depends on complex logic

## Gotchas
- `useRef` changes don't cause re-renders — don't use it for UI-driving data
- `useReducer` actions should describe *what happened*, not *how state changes*

## My notes / examples

