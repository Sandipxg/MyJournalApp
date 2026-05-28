import { Navigate } from "react-router-dom"

// Reads the mock auth flag — swap with real auth later
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

function ProtectedRoute({ children }) {
  if (!isLoggedIn) {
    return <Navigate to="/auth" />
  }

  return children
}

export default ProtectedRoute
