# Components & Props

## What are Components?

Components are **reusable, independent pieces of UI**. Think of them as custom HTML elements that you can create and reuse throughout your app.

**Two types:**
- **Functional Components** (modern, recommended)
- **Class Components** (legacy, avoid in new code)

---

## Creating Components

### Basic Functional Component
```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function syntax (also common)
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Implicit return (for simple components)
const Welcome = () => <h1>Hello, World!</h1>;
```

### Using Components
```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}
```

---

## What are Props?

**Props** (short for "properties") are **inputs** passed to components. They let you customize and reuse components with different data.

**Key characteristics:**
- ✅ Read-only (immutable)
- ✅ Flow from parent → child (one-way data flow)
- ✅ Can be any JavaScript value (strings, numbers, objects, functions, etc.)

---

## Passing and Using Props

### Basic Props
```jsx
// Passing props
<Greeting name="Alex" age={25} />

// Receiving props
function Greeting(props) {
  return <p>Hello, {props.name}! You are {props.age} years old.</p>;
}

// Destructuring props (cleaner, preferred)
function Greeting({ name, age }) {
  return <p>Hello, {name}! You are {age} years old.</p>;
}
```

### Multiple Props
```jsx
function UserCard({ name, email, avatar, isOnline }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      {isOnline && <span className="status">🟢 Online</span>}
    </div>
  );
}

// Usage
<UserCard 
  name="Sarah" 
  email="sarah@example.com" 
  avatar="avatar.jpg"
  isOnline={true}
/>
```

---

## Props Types

### String Props
```jsx
<Button label="Submit" color="blue" />
```

### Number Props
```jsx
<Counter initialValue={0} step={5} />
```

### Boolean Props
```jsx
<Button disabled={true} />
// Shorthand for true:
<Button disabled />
```

### Object Props
```jsx
const user = { name: "Alex", age: 25 };
<Profile user={user} />
```

### Array Props
```jsx
const items = ["Apple", "Banana", "Cherry"];
<List items={items} />
```

### Function Props (Callbacks)
```jsx
function App() {
  const handleClick = () => alert("Clicked!");
  
  return <Button onClick={handleClick} label="Click me" />;
}

function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}
```

---

## Default Props

### Using Default Parameters
```jsx
function Button({ label = "Click me", color = "blue", disabled = false }) {
  return (
    <button className={color} disabled={disabled}>
      {label}
    </button>
  );
}

// Usage
<Button /> // Uses all defaults
<Button label="Submit" /> // Overrides label only
```

---

## The `children` Prop

The special `children` prop contains everything between opening and closing tags:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  <h2>Title</h2>
  <p>This is the content inside the card.</p>
  <button>Action</button>
</Card>
```

### Combining children with other props
```jsx
function Panel({ title, children }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

<Panel title="Settings">
  <p>Panel content goes here</p>
</Panel>
```

---

## Spreading Props

Pass multiple props at once using the spread operator:

```jsx
const buttonProps = {
  label: "Submit",
  color: "blue",
  disabled: false,
  onClick: handleSubmit
};

<Button {...buttonProps} />

// Same as:
<Button 
  label="Submit" 
  color="blue" 
  disabled={false} 
  onClick={handleSubmit} 
/>
```

---

## Props Validation (Optional)

Use PropTypes for runtime type checking (helpful in JavaScript):

```jsx
import PropTypes from 'prop-types';

function Button({ label, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};
```

**Note:** TypeScript is a better alternative for type safety.

---

## Component Composition

Build complex UIs by composing smaller components:

```jsx
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserInfo({ name, email }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
    </div>
  );
}
```

---

## Common Patterns

### Conditional Props
```jsx
function Button({ variant, children }) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return <button className={className}>{children}</button>;
}
```

### Render Props Pattern
```jsx
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);
  
  return render(data);
}

// Usage
<DataFetcher 
  url="/api/user" 
  render={(data) => data ? <p>{data.name}</p> : <p>Loading...</p>}
/>
```

---

## Important Rules

### ❌ Never Modify Props
```jsx
// ❌ WRONG - props are read-only
function Button({ label }) {
  label = label.toUpperCase(); // Don't do this!
  return <button>{label}</button>;
}

// ✅ CORRECT - create a new variable
function Button({ label }) {
  const displayLabel = label.toUpperCase();
  return <button>{displayLabel}</button>;
}
```

### ✅ Props Flow Downward
```jsx
// Parent → Child (✅ correct)
<Child data={parentData} />

// Child → Parent (❌ not directly)
// Use callback functions instead:
<Child onUpdate={handleUpdate} />
```

---

## Real-World Example

```jsx
// Reusable Button Component
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${sizeClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage
function App() {
  return (
    <div>
      <Button variant="primary" size="large" onClick={() => alert('Clicked!')}>
        Submit
      </Button>
      <Button variant="secondary" size="small">
        Cancel
      </Button>
      <Button disabled>
        Disabled
      </Button>
    </div>
  );
}
```

---

## Quick Reference

| Concept | Description |
|---------|-------------|
| **Component** | Reusable UI building block |
| **Props** | Data passed from parent to child |
| **children** | Special prop for nested content |
| **Default props** | Fallback values using default parameters |
| **Spread props** | `{...props}` to pass multiple props |
| **Immutable** | Props cannot be modified inside component |

