const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}/posts`)
  if (!response.ok) throw new Error("Failed to fetch posts")
  return response.json()
}
