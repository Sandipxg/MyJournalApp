# JSX (JavaScript XML)

## What is JSX?

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files. It makes React code more readable and intuitive.

**Under the hood:** JSX gets transformed into `React.createElement()` calls by Babel/Vite.

```jsx
// This JSX:
<h1 className="title">Hello</h1>

// Becomes this JavaScript:
React.createElement('h1', { className: 'title' }, 'Hello')
```

---

## Basic Syntax

### Simple Elements
```jsx
const element = <h1>Hello, world!</h1>;
const image = <img src="logo.png" alt="Logo" />;
```

### JavaScript Expressions in JSX
Use curly braces `{}` to embed any JavaScript expression:

```jsx
const name = "Alex";
const age = 25;

const greeting = <p>Hello, {name}! You are {age} years old.</p>;
const math = <p>2 + 2 = {2 + 2}</p>;
const conditional = <p>{age >= 18 ? "Adult" : "Minor"}</p>;
```

### Multi-line JSX
Wrap in parentheses for readability:

```jsx
const card = (
  <div className="card">
    <h2>Title</h2>
    <p>Content goes here</p>
    <button>Click me</button>
  </div>
);
```

---

## JSX Rules & Differences from HTML

### 1. Use `className` instead of `class`
```jsx
// ❌ Wrong
<div class="container">

// ✅ Correct
<div className="container">
```

### 2. Use `htmlFor` instead of `for`
```jsx
<label htmlFor="email">Email:</label>
<input id="email" type="email" />
```

### 3. Self-closing tags must close
```jsx
// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
<br />
```

### 4. Single root element
Every JSX expression must have ONE parent element:

```jsx
// ❌ Wrong - multiple roots
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ Correct - wrapped in div
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✅ Better - use Fragment (no extra DOM node)
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

### 5. Inline styles use objects
```jsx
const style = {
  color: 'blue',
  fontSize: '16px',
  backgroundColor: 'lightgray'
};

<div style={style}>Styled text</div>

// Or inline:
<div style={{ color: 'red', padding: '10px' }}>Text</div>
```

### 6. camelCase for attributes
```jsx
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<div onMouseEnter={handleHover} />
```

---

## Embedding JavaScript

### Variables and Functions
```jsx
const user = { name: "Sarah", avatar: "avatar.jpg" };

const element = (
  <div>
    <img src={user.avatar} alt={user.name} />
    <h2>{user.name.toUpperCase()}</h2>
  </div>
);
```

### Arrays (with map)
```jsx
const fruits = ["Apple", "Banana", "Cherry"];

const list = (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
```

### Conditional Rendering
```jsx
const isLoggedIn = true;

// Ternary operator
<div>{isLoggedIn ? <Dashboard /> : <Login />}</div>

// Logical AND (&&)
<div>{isLoggedIn && <WelcomeMessage />}</div>

// If/else outside JSX
let content;
if (isLoggedIn) {
  content = <Dashboard />;
} else {
  content = <Login />;
}
return <div>{content}</div>;
```

---

## Comments in JSX

```jsx
return (
  <div>
    {/* This is a comment in JSX */}
    <h1>Title</h1>
    
    {/* 
      Multi-line comment
      in JSX
    */}
  </div>
);
```

---

## Common Patterns

### Spreading Props
```jsx
const props = { id: "btn-1", className: "primary", disabled: false };

<button {...props}>Click me</button>
// Same as: <button id="btn-1" className="primary" disabled={false}>
```

### Children Prop
```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage:
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

---

## Quick Reference

| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` |
| `tabindex` | `tabIndex` |
| `<input>` | `<input />` |
| `style="color: red"` | `style={{ color: 'red' }}` |

---

## Practice Examples

```jsx
// Example 1: User Card
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      {user.isVerified && <span className="badge">✓ Verified</span>}
    </div>
  );
}

// Example 2: Dynamic List
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'done' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

