const BASE_URL = "http://localhost:3000/api/journals"

export async function fetchJournals(userId) {
  const res = await fetch(`${BASE_URL}?userId=${userId}`)
  if (!res.ok) throw new Error("Failed to fetch journals")
  return res.json()
}

export async function fetchJournal(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error("Journal not found")
  return res.json()
}

export async function createJournal(userId, title) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, title }),
  })
  if (!res.ok) throw new Error("Failed to create journal")
  return res.json()
}

export async function updateJournal(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update journal")
  return res.json()
}

export async function deleteJournal(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete journal")
  return res.json()
}
