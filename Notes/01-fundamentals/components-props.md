# Components & Props

## What it is
Components are reusable UI building blocks. Props are the inputs passed into them — read-only, flowing parent → child.

## Syntax / Usage
```jsx
// Functional component
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Usage
<Button label="Submit" onClick={handleSubmit} />

// Default props
function Button({ label = "Click me", onClick }) { ... }

// Spreading props
<Button {...buttonProps} />
```

## When to use
- Break UI into components when a piece of UI is reused or complex enough to isolate
- Use props to pass data and callbacks from parent to child

## Gotchas
- Props are immutable — never modify them directly
- Prop names are camelCase
- Children are passed via the special `children` prop

## My notes / examples

