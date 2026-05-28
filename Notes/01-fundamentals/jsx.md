# JSX

## What it is
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JS files. React transforms it into `React.createElement()` calls under the hood.

## Syntax / Usage
```jsx
const element = <h1 className="title">Hello, world!</h1>;

// Expressions inside JSX
const name = "Alex";
const greeting = <p>Hello, {name}</p>;

// Multi-line — wrap in parentheses
const card = (
  <div className="card">
    <h2>Title</h2>
    <p>Content</p>
  </div>
);
```

## When to use
Always — JSX is the standard way to describe UI in React components.

## Gotchas
- Use `className` instead of `class`
- Every JSX expression must have a single root element (or use `<>...</>` fragment)
- Self-closing tags must close: `<img />`, `<input />`
- JS expressions go in `{}`, not quotes

## My notes / examples

