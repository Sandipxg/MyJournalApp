import { Navigate } from "react-router-dom"

// isLoggedIn is hardcoded for now — swap with real auth later
const isLoggedIn = false

function ProtectedRoute({ children }) {
  if (!isLoggedIn) {
    return <Navigate to="/auth" />
  }

  return children
}

export default ProtectedRoute
