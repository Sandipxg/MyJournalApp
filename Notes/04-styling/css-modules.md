# CSS Modules

## What it is
CSS files where class names are scoped locally to the component by default. Prevents style conflicts across components.

## Syntax / Usage
```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
  padding: 8px 16px;
}

.button:hover {
  background: darkblue;
}
```

```jsx
// Button.jsx
import styles from "./Button.module.css";

function Button({ label }) {
  return <button className={styles.button}>{label}</button>;
}

// Multiple classes
<div className={`${styles.card} ${styles.active}`} />

// Conditional class
<div className={`${styles.card} ${isActive ? styles.active : ""}`} />
```

## When to use
- When you want scoped styles without a CSS-in-JS library
- Good default choice for component-level styling in Vite/CRA projects

## Gotchas
- File must be named `*.module.css`
- Class names become object keys — use camelCase or bracket notation for hyphenated names: `styles["my-class"]`
- Global styles still go in a regular `.css` file

## My notes / examples

