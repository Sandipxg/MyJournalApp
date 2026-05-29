import { createContext, useState, useContext } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser")
    return saved ? JSON.parse(saved) : null
  })

  function signup(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const exists = users.find((u) => u.username === username)
    if (exists) throw new Error("Username already taken")

    const newUser = { username, password }
    localStorage.setItem("users", JSON.stringify([...users, newUser]))

    const loggedIn = { username }
    localStorage.setItem("currentUser", JSON.stringify(loggedIn))
    setCurrentUser(loggedIn)
  }

  function login(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const user = users.find((u) => u.username === username && u.password === password)
    if (!user) throw new Error("Invalid username or password")

    const loggedIn = { username }
    localStorage.setItem("currentUser", JSON.stringify(loggedIn))
    setCurrentUser(loggedIn)
  }

  function logout() {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
