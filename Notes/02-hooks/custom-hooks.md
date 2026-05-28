# Custom Hooks

## What it is
Functions that start with `use` and encapsulate reusable stateful logic. They can call other hooks internally.

## Syntax / Usage
```jsx
// usePosts.js
import { useState, useEffect } from "react";

function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, error };
}

// Usage in a component
function JournalList() {
  const { posts, loading, error } = usePosts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return posts.map(post => <JournalCard key={post.id} post={post} />);
}
```

## When to use
- Reusing the same stateful logic across multiple components
- Cleaning up bloated components by extracting logic
- Abstracting API calls, form logic, timers, etc.

## Gotchas
- Must start with `use` — React enforces hook rules on it
- Can only be called at the top level of a component or another hook

## My notes / examples
- `usePosts.js` already built in the journal app — handles fetch, loading, error state

