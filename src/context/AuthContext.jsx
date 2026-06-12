import { createContext, useState, useContext } from "react"

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth`
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser")
    if (!saved) return null
    const parsed = JSON.parse(saved)
    // old sessions from before the backend had no id — drop them
    if (!parsed.id) {
      localStorage.removeItem("currentUser")
      return null
    }
    return parsed
  })

  async function signup(username, password) {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    localStorage.setItem("currentUser", JSON.stringify(data))
    setCurrentUser(data)
  }

  async function login(username, password) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    // Store only the user object for consistency with signup
    const userToSave = data.user
    localStorage.setItem("currentUser", JSON.stringify(userToSave))
    setCurrentUser(userToSave)
  }

  async function logout() {
    try {
      await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      })
    } catch (err) {
      console.error("Failed to call logout on backend:", err)
    }
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  async function deleteAccount(username, password) {
    const res = await fetch(`${BASE_URL}/deleteaccount`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    localStorage.removeItem("currentUser")
    setCurrentUser(null)

    return data
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout , deleteAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
