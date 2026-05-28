# Lists & Conditional Rendering

## What it is
Rendering dynamic lists from arrays, and showing/hiding UI based on conditions.

## Syntax / Usage
```jsx
// Lists — always use a unique key
const items = ["Apple", "Banana", "Cherry"];
<ul>
  {items.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

// With objects
{posts.map(post => (
  <JournalCard key={post.id} post={post} />
))}

// Conditional — ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Conditional — short circuit
{isLoading && <Spinner />}

// Conditional — if/else outside JSX
let content;
if (error) content = <Error />;
else if (isLoading) content = <Spinner />;
else content = <Data />;
```

## When to use
- `.map()` for rendering arrays of data
- Ternary for if/else UI branches
- `&&` for showing something only when a condition is true

## Gotchas
- Keys must be unique among siblings — prefer IDs over array indexes
- `0 && <Component />` renders `0` — use `!!count && ...` or a ternary instead

## My notes / examples

