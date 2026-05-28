# Fetch API & Async/Await

## What is the Fetch API?

**Fetch** is the modern, native browser API for making HTTP requests. Combined with **async/await**, it provides clean, readable code for handling asynchronous operations.

**Benefits:**
- ✅ Built into browsers (no library needed)
- ✅ Promise-based
- ✅ Clean syntax with async/await
- ✅ Supports all HTTP methods

---

## Basic Fetch

### GET Request
```js
// Basic fetch
fetch('https://api.example.com/posts')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// With async/await (cleaner)
async function fetchPosts() {
  try {
    const response = await fetch('https://api.example.com/posts');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### POST Request
```js
async function createPost(postData) {
  try {
    const response = await fetch('https://api.example.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Usage
const newPost = {
  title: 'My Post',
  content: 'Post content here',
  userId: 1
};

createPost(newPost);
```

---

## HTTP Methods

### GET - Retrieve Data
```js
async function getUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}
```

### POST - Create Data
```js
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}
```

### PUT - Update (Replace) Data
```js
async function updateUser(userId, userData) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
}
```

### PATCH - Partial Update
```js
async function updateUserEmail(userId, email) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
}
```

### DELETE - Remove Data
```js
async function deleteUser(userId) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });
  return response.json();
}
```

---

## Error Handling

### Check Response Status
```js
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Fetch doesn't throw on 4xx/5xx - check manually
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### Handle Different Error Types
```js
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Handle specific status codes
      switch (response.status) {
        case 400:
          throw new Error('Bad request');
        case 401:
          throw new Error('Unauthorized - please login');
        case 403:
          throw new Error('Forbidden - access denied');
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error(`HTTP error: ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      // Network error
      throw new Error('Network error - check your connection');
    }
    throw error;
  }
}
```

---

## Using Fetch in React

### Basic Component with Fetch
```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Fetch with Dependencies
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <p>Loading...</p>;
  
  return <div>{user?.name}</div>;
}
```

### POST Request in React
```jsx
function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      
      const newPost = await response.json();
      console.log('Created:', newPost);
      
      // Clear form
      setTitle('');
      setContent('');
      alert('Post created successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea 
        value={content} 
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
```

---

## Advanced Patterns

### Abort Controller (Cancel Requests)
```jsx
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function search() {
      if (!query) return;
      
      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        });
        const data = await response.json();
        setResults(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request cancelled');
        } else {
          console.error(err);
        }
      }
    }
    
    search();
    
    // Cleanup: cancel request if component unmounts or query changes
    return () => controller.abort();
  }, [query]);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Timeout
```js
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}
```

### Retry Logic
```js
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
}
```

### Parallel Requests
```js
async function fetchMultiple() {
  try {
    // Wait for all requests to complete
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('One or more requests failed:', error);
  }
}
```

### Sequential Requests
```js
async function fetchSequential() {
  // Fetch user first
  const userResponse = await fetch('/api/user/1');
  const user = await userResponse.json();
  
  // Then fetch their posts
  const postsResponse = await fetch(`/api/users/${user.id}/posts`);
  const posts = await postsResponse.json();
  
  // Then fetch comments for first post
  const commentsResponse = await fetch(`/api/posts/${posts[0].id}/comments`);
  const comments = await commentsResponse.json();
  
  return { user, posts, comments };
}
```

---

## Authentication

### Bearer Token
```js
async function fetchWithAuth(url) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}
```

### Login Example
```js
async function login(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const { token, user } = await response.json();
    
    // Store token
    localStorage.setItem('token', token);
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
```

---

## Custom Hooks for API Calls

### useFetch Hook
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### useApi Hook (with CRUD operations)
```jsx
import { useState } from 'react';

function useApi(baseUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const request = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const get = (endpoint) => request(endpoint);
  
  const post = (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  const put = (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  
  const del = (endpoint) => request(endpoint, {
    method: 'DELETE'
  });
  
  return { get, post, put, del, loading, error };
}

// Usage
function PostManager() {
  const api = useApi('/api');
  const [posts, setPosts] = useState([]);
  
  const loadPosts = async () => {
    const data = await api.get('/posts');
    setPosts(data);
  };
  
  const createPost = async (postData) => {
    const newPost = await api.post('/posts', postData);
    setPosts([...posts, newPost]);
  };
  
  const deletePost = async (id) => {
    await api.del(`/posts/${id}`);
    setPosts(posts.filter(p => p.id !== id));
  };
  
  return (
    <div>
      {api.loading && <p>Loading...</p>}
      {api.error && <p>Error: {api.error}</p>}
      {/* UI here */}
    </div>
  );
}
```

---

## Best Practices

### 1. Always Handle Errors
```js
// ✅ GOOD
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  const data = await response.json();
} catch (error) {
  console.error(error);
}

// ❌ BAD
const response = await fetch(url);
const data = await response.json(); // No error handling
```

### 2. Check response.ok
```js
// ✅ GOOD
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`);
}

// ❌ BAD - fetch doesn't throw on 4xx/5xx
const data = await response.json();
```

### 3. Use AbortController for Cleanup
```js
// ✅ GOOD
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);
```

### 4. Show Loading States
```jsx
// ✅ GOOD
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Data data={data} />;
```

---

## Quick Reference

```js
// GET
const response = await fetch(url);
const data = await response.json();

// POST
await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// Error handling
if (!response.ok) {
  throw new Error(`HTTP error: ${response.status}`);
}

// With auth
headers: {
  'Authorization': `Bearer ${token}`
}

// Abort
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```
