# Fetch API & Async/Await

## What it is
The native browser API for making HTTP requests. Combined with async/await for clean, readable async code.

## Syntax / Usage
```js
// Basic GET
const res = await fetch("https://api.example.com/posts");
const data = await res.json();

// With error handling
async function fetchPosts() {
  try {
    const res = await fetch("/api/posts");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

// POST request
const res = await fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Post", content: "..." }),
});

// Inside useEffect
useEffect(() => {
  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);
```

## When to use
- Fetching data on component mount
- Submitting forms to an API
- Any communication with a backend or external API

## Gotchas
- `fetch` doesn't throw on 4xx/5xx — check `res.ok` manually
- Can't use `async` directly in `useEffect` — define an inner async function
- Always handle loading and error states for good UX

## My notes / examples
- Used in `usePosts.js` custom hook in the journal app

