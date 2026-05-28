# State & Event Handling

## What is State?

**State** is data that a component **owns and manages**. When state changes, React automatically re-renders the component to reflect the new data.

**Key characteristics:**
- ✅ Local to the component
- ✅ Mutable (can be changed)
- ✅ Triggers re-renders when updated
- ✅ Persists between re-renders

---

## useState Hook

The `useState` hook lets you add state to functional components.

### Basic Syntax
```jsx
import { useState } from 'react';

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### How it Works
1. `useState(0)` initializes state with value `0`
2. Returns an array: `[currentValue, setterFunction]`
3. Calling `setCount(newValue)` updates state and triggers re-render

---

## Updating State

### Direct Update
```jsx
const [count, setCount] = useState(0);

// Simple update
setCount(5); // count becomes 5
setCount(count + 1); // increment by 1
```

### Functional Update (Recommended)
Use when new state depends on previous state:

```jsx
// ✅ CORRECT - functional update
setCount(prev => prev + 1);

// ❌ WRONG - can cause bugs with multiple updates
setCount(count + 1);
```

**Why functional updates?**
```jsx
// This might not work as expected:
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Result: count increases by 1 (not 3!)

// This works correctly:
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Result: count increases by 3 ✅
```

---

## State with Different Data Types

### String State
```jsx
const [name, setName] = useState('');

<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
```

### Boolean State
```jsx
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? 'Close' : 'Open'}
</button>
```

### Array State
```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));

// Update item
setItems(items.map(item => 
  item.id === id ? { ...item, completed: true } : item
));
```

### Object State
```jsx
const [user, setUser] = useState({ name: '', email: '' });

// Update single property
setUser({ ...user, name: 'Alex' });

// Update multiple properties
setUser(prev => ({ ...prev, name: 'Alex', age: 25 }));
```

---

## Event Handling

Events let you respond to user interactions like clicks, typing, form submissions, etc.

### Common Events

#### onClick
```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// Inline (for simple logic)
<button onClick={() => alert('Clicked!')}>Click</button>
```

#### onChange (for inputs)
```jsx
function Input() {
  const [text, setText] = useState('');
  
  const handleChange = (e) => {
    setText(e.target.value);
  };
  
  return (
    <input 
      type="text" 
      value={text} 
      onChange={handleChange} 
    />
  );
}
```

#### onSubmit (for forms)
```jsx
function Form() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Submitted:', email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Event Object
```jsx
function handleClick(e) {
  console.log(e.target);      // The element that triggered the event
  console.log(e.type);        // Event type: 'click'
  console.log(e.currentTarget); // Element with the event handler
}

function handleChange(e) {
  console.log(e.target.value); // Input value
}
```

---

## Common Event Types

| Event | When it fires | Common use |
|-------|---------------|------------|
| `onClick` | Element is clicked | Buttons, links |
| `onChange` | Input value changes | Text inputs, selects |
| `onSubmit` | Form is submitted | Forms |
| `onFocus` | Element receives focus | Inputs |
| `onBlur` | Element loses focus | Inputs |
| `onMouseEnter` | Mouse enters element | Hover effects |
| `onMouseLeave` | Mouse leaves element | Hover effects |
| `onKeyDown` | Key is pressed | Keyboard shortcuts |
| `onKeyUp` | Key is released | Keyboard input |

---

## Controlled Components

A **controlled component** is an input whose value is controlled by React state:

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <input 
        type="text"
        value={value}                          // Controlled by state
        onChange={(e) => setValue(e.target.value)} // Update state
      />
      <p>You typed: {value}</p>
    </div>
  );
}
```

### Multiple Inputs
```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <form>
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        name="age" 
        value={formData.age} 
        onChange={handleChange} 
      />
    </form>
  );
}
```

---

## Passing Arguments to Event Handlers

### Using Arrow Functions
```jsx
function List() {
  const handleDelete = (id) => {
    console.log('Delete item:', id);
  };
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Using bind (alternative)
```jsx
<button onClick={handleDelete.bind(null, item.id)}>Delete</button>
```

---

## Real-World Examples

### Toggle Example
```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div>
      <p>The switch is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        Toggle
      </button>
    </div>
  );
}
```

### Counter with Multiple Buttons
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>
      <button onClick={() => setCount(prev => prev + 10)}>+10</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Todo List
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Important Rules

### ❌ Never Mutate State Directly
```jsx
// ❌ WRONG
const [user, setUser] = useState({ name: 'Alex' });
user.name = 'Sarah'; // Don't mutate directly!

// ✅ CORRECT
setUser({ ...user, name: 'Sarah' });
```

### ❌ Don't Rely on State Immediately After Setting
```jsx
// ❌ WRONG - state updates are asynchronous
setCount(count + 1);
console.log(count); // Still shows old value!

// ✅ CORRECT - use useEffect to react to state changes
useEffect(() => {
  console.log(count); // Shows updated value
}, [count]);
```

### ✅ Each Component Instance Has Its Own State
```jsx
function App() {
  return (
    <>
      <Counter /> {/* Independent state */}
      <Counter /> {/* Independent state */}
    </>
  );
}
```

---

## Quick Reference

```jsx
// Initialize state
const [value, setValue] = useState(initialValue);

// Update state
setValue(newValue);
setValue(prev => prev + 1); // Functional update

// Common patterns
const [text, setText] = useState('');
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([]);
const [user, setUser] = useState({});

// Event handlers
onClick={() => handleClick()}
onChange={(e) => handleChange(e)}
onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
```

