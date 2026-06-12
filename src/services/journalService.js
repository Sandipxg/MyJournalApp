const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/journals`

export async function fetchJournals() {
  const res = await fetch(BASE_URL, { credentials: "include" })
  if (!res.ok) throw new Error("Failed to fetch journals")
  return res.json()
}

export async function fetchJournal(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { credentials: "include" })
  if (!res.ok) throw new Error("Journal not found")
  return res.json()
}

export async function createJournal(title) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to create journal")
  return res.json()
}

export async function updateJournal(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to update journal")
  return res.json()
}

export async function deleteJournal(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to delete journal")
  return res.json()
}
