# CSS Modules

## What are CSS Modules?

**CSS Modules** are CSS files where class names are **locally scoped** by default. This prevents style conflicts and makes your styles component-specific.

**Benefits:**
- ✅ No naming conflicts
- ✅ Component-scoped styles
- ✅ Works with standard CSS
- ✅ Built into Vite/CRA

---

## Basic Usage

### 1. Create a CSS Module File
File must end with `.module.css`:

```css
/* Button.module.css */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.primary {
  background-color: #007bff;
}

.secondary {
  background-color: #6c757d;
}

.large {
  padding: 15px 30px;
  font-size: 18px;
}

.small {
  padding: 5px 10px;
  font-size: 14px;
}
```

### 2. Import and Use in Component
```jsx
// Button.jsx
import styles from './Button.module.css';

function Button({ label, variant = 'primary', size = 'medium' }) {
  return (
    <button className={styles.button}>
      {label}
    </button>
  );
}
```

---

## Multiple Classes

### Template Literals
```jsx
import styles from './Card.module.css';

function Card({ isActive, isHighlighted }) {
  return (
    <div className={`${styles.card} ${styles.primary}`}>
      Content
    </div>
  );
}
```

### Conditional Classes
```jsx
function Card({ isActive }) {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      Content
    </div>
  );
}
```

### Using clsx Library (Recommended)
```bash
npm install clsx
```

```jsx
import clsx from 'clsx';
import styles from './Card.module.css';

function Card({ isActive, isHighlighted, variant }) {
  return (
    <div className={clsx(
      styles.card,
      styles[variant],
      isActive && styles.active,
      isHighlighted && styles.highlighted
    )}>
      Content
    </div>
  );
}
```

---

## Composition

### Composing Styles
```css
/* Card.module.css */
.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cardPrimary {
  composes: card;
  background-color: #007bff;
  color: white;
}

.cardSecondary {
  composes: card;
  background-color: #6c757d;
  color: white;
}
```

```jsx
import styles from './Card.module.css';

function Card({ variant = 'primary' }) {
  const className = variant === 'primary' ? styles.cardPrimary : styles.cardSecondary;
  
  return <div className={className}>Content</div>;
}
```

---

## Global Styles

### :global Selector
```css
/* Component.module.css */
.container {
  padding: 20px;
}

/* Global class - not scoped */
:global(.highlight) {
  background-color: yellow;
}

/* Mix local and global */
.container :global(.external-class) {
  color: red;
}
```

---

## Hyphenated Class Names

```css
/* Card.module.css */
.card-header {
  font-size: 24px;
}
```

```jsx
import styles from './Card.module.css';

// Use bracket notation
<div className={styles['card-header']}>Header</div>

// Or use camelCase in CSS
.cardHeader {
  font-size: 24px;
}

// Then use dot notation
<div className={styles.cardHeader}>Header</div>
```

---

## Real-World Example

```css
/* ProductCard.module.css */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 12px 0 8px;
}

.price {
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badgeSale {
  composes: badge;
  background-color: #dc3545;
  color: white;
}

.badgeNew {
  composes: badge;
  background-color: #28a745;
  color: white;
}

.button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.outOfStock {
  color: #dc3545;
  font-weight: bold;
}
```

```jsx
// ProductCard.jsx
import clsx from 'clsx';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { name, price, image, inStock, isNew, onSale } = product;
  
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      
      <div>
        {isNew && <span className={styles.badgeNew}>NEW</span>}
        {onSale && <span className={styles.badgeSale}>SALE</span>}
      </div>
      
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.price}>${price}</p>
      
      {inStock ? (
        <button className={styles.button}>Add to Cart</button>
      ) : (
        <p className={styles.outOfStock}>Out of Stock</p>
      )}
    </div>
  );
}
```

---

## Best Practices

### 1. Use Descriptive Names
```css
/* ✅ GOOD */
.cardHeader { }
.primaryButton { }
.errorMessage { }

/* ❌ BAD */
.ch { }
.btn1 { }
.red { }
```

### 2. Keep Styles Component-Specific
```css
/* ✅ GOOD - specific to Button component */
.button {
  padding: 10px 20px;
}

/* ❌ BAD - too generic */
.container {
  width: 100%;
}
```

### 3. Use Composition
```css
/* ✅ GOOD */
.button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.primaryButton {
  composes: button;
  background-color: blue;
}

.secondaryButton {
  composes: button;
  background-color: gray;
}
```

---

## CSS Modules vs Other Approaches

| Feature | CSS Modules | Inline Styles | Tailwind | Styled Components |
|---------|-------------|---------------|----------|-------------------|
| Scoped | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| Standard CSS | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Pseudo-classes | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Media queries | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Setup required | ❌ No | ❌ No | ✅ Yes | ✅ Yes |

---

## Quick Reference

```jsx
// Import
import styles from './Component.module.css';

// Single class
<div className={styles.card}>

// Multiple classes
<div className={`${styles.card} ${styles.active}`}>

// Conditional
<div className={`${styles.card} ${isActive ? styles.active : ''}`}>

// With clsx
<div className={clsx(styles.card, isActive && styles.active)}>

// Hyphenated names
<div className={styles['card-header']}>
```


