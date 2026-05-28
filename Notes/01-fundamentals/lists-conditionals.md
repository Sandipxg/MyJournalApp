# Lists & Conditional Rendering

## Rendering Lists

### Why Use Lists?

In React, you often need to display multiple similar items from an array of data (users, products, posts, etc.). The `.map()` method is the standard way to transform data arrays into JSX elements.

---

## Basic List Rendering

### Simple Array
```jsx
const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### Array of Objects
```jsx
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}
```

---

## The `key` Prop

**Keys help React identify which items have changed, been added, or removed.**

### ✅ Good Keys (Unique & Stable)
```jsx
// Use unique IDs from your data
{posts.map(post => (
  <Post key={post.id} post={post} />
))}

// Use unique identifiers
{users.map(user => (
  <UserCard key={user.email} user={user} />
))}
```

### ⚠️ Acceptable (Only if no unique ID exists)
```jsx
// Index as key (only if list never reorders/filters)
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

### ❌ Bad Keys
```jsx
// Random values - causes re-renders
{items.map(item => (
  <li key={Math.random()}>{item}</li>
))}

// Non-unique values
{items.map(item => (
  <li key={item.category}>{item.name}</li>
))}
```

**Why keys matter:**
- Without keys, React can't track items efficiently
- Wrong keys cause bugs (wrong items update, state gets mixed up)
- Keys must be unique among siblings (not globally)

---

## Rendering Components from Arrays

```jsx
const posts = [
  { id: 1, title: 'First Post', content: 'Hello world' },
  { id: 2, title: 'Second Post', content: 'React is awesome' }
];

function Blog() {
  return (
    <div>
      {posts.map(post => (
        <PostCard 
          key={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
}

function PostCard({ title, content }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
}
```

---

## Filtering Lists

```jsx
function TodoList({ todos }) {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  
  return (
    <div>
      <h3>Active</h3>
      <ul>
        {activeTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      
      <h3>Completed</h3>
      <ul>
        {completedTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Conditional Rendering

### What is Conditional Rendering?

Showing or hiding UI elements based on conditions (like if/else in regular JavaScript).

---

## Conditional Rendering Techniques

### 1. Ternary Operator (if/else)
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}
```

### 2. Logical AND (`&&`) - Show if true
```jsx
function Notifications({ count }) {
  return (
    <div>
      <h2>Notifications</h2>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}
```

### 3. Logical OR (`||`) - Fallback value
```jsx
function UserName({ name }) {
  return <p>{name || 'Anonymous'}</p>;
}
```

### 4. If/Else Outside JSX
```jsx
function Dashboard({ user, loading, error }) {
  if (loading) {
    return <Spinner />;
  }
  
  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  if (!user) {
    return <Login />;
  }
  
  return <DashboardContent user={user} />;
}
```

### 5. Switch Statement
```jsx
function StatusBadge({ status }) {
  let badge;
  
  switch (status) {
    case 'success':
      badge = <span className="badge-success">✓ Success</span>;
      break;
    case 'error':
      badge = <span className="badge-error">✗ Error</span>;
      break;
    case 'pending':
      badge = <span className="badge-pending">⏳ Pending</span>;
      break;
    default:
      badge = <span>Unknown</span>;
  }
  
  return badge;
}
```

### 6. Immediately Invoked Function Expression (IIFE)
```jsx
function ComplexConditional({ status }) {
  return (
    <div>
      {(() => {
        if (status === 'loading') return <Spinner />;
        if (status === 'error') return <Error />;
        if (status === 'success') return <Success />;
        return <Default />;
      })()}
    </div>
  );
}
```

---

## Common Patterns

### Loading, Error, Success States
```jsx
function DataDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ... fetch logic
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Show/Hide Toggle
```jsx
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '▼' : '▶'}
      </button>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
}
```

### Multiple Conditions
```jsx
function UserBadge({ user }) {
  return (
    <div>
      {user.isPremium && <span>⭐ Premium</span>}
      {user.isVerified && <span>✓ Verified</span>}
      {user.isAdmin && <span>👑 Admin</span>}
    </div>
  );
}
```

### Conditional Styling
```jsx
function Button({ isPrimary, isDisabled }) {
  return (
    <button 
      className={`btn ${isPrimary ? 'btn-primary' : 'btn-secondary'}`}
      disabled={isDisabled}
    >
      Click me
    </button>
  );
}
```

---

## Common Gotchas

### ❌ Falsy Values Render as Text
```jsx
const count = 0;

// ❌ WRONG - renders "0" on screen
{count && <Badge count={count} />}

// ✅ CORRECT - explicitly check
{count > 0 && <Badge count={count} />}
{!!count && <Badge count={count} />}
{count ? <Badge count={count} /> : null}
```

### ❌ Missing Keys in Lists
```jsx
// ❌ WRONG - no key
{items.map(item => <li>{item}</li>)}

// ✅ CORRECT
{items.map((item, index) => <li key={index}>{item}</li>)}
```

### ❌ Using Index as Key with Dynamic Lists
```jsx
// ❌ WRONG - causes bugs when list changes
{todos.map((todo, index) => <Todo key={index} todo={todo} />)}

// ✅ CORRECT - use unique ID
{todos.map(todo => <Todo key={todo.id} todo={todo} />)}
```

---

## Real-World Example

```jsx
function ProductList({ products, category, searchTerm }) {
  // Filter products
  const filteredProducts = products
    .filter(p => !category || p.category === category)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Conditional rendering
  if (filteredProducts.length === 0) {
    return <p>No products found</p>;
  }
  
  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          
          {product.inStock ? (
            <button>Add to Cart</button>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
          
          {product.discount > 0 && (
            <span className="discount-badge">-{product.discount}%</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Quick Reference

### Lists
```jsx
// Basic list
{items.map((item, index) => <li key={index}>{item}</li>)}

// With components
{users.map(user => <UserCard key={user.id} user={user} />)}

// Filtered list
{items.filter(item => item.active).map(item => <Item key={item.id} {...item} />)}
```

### Conditionals
```jsx
// Ternary (if/else)
{condition ? <ComponentA /> : <ComponentB />}

// AND (show if true)
{condition && <Component />}

// OR (fallback)
{value || 'default'}

// If/else outside JSX
if (condition) return <ComponentA />;
return <ComponentB />;
```
