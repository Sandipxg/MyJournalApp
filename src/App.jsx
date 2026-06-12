import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ThemeProvider } from "./context/ThemeContext"
import ThemeContext from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { InstallProvider, useInstall } from './context/InstallContext'

import HomePage from "./pages/Homepage"
import JournalPage from "./pages/Journalpage"
import JournalDetailPage from "./pages/JournalDetailPage"
import SettingsPage from "./pages/Settingpage"
import LoginPage from "./pages/Loginpage"
import ProtectedRoute from "./components/ProtectedRoute"

function AppLayout() {
  const { theme } = useContext(ThemeContext)
  const { currentUser, logout } = useAuth()
  const { isInstallable, isInstalled, install } = useInstall()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/auth")
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center gap-6">
          <Link to="/" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Home</Link>
          <Link to="/journals" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Journals</Link>
          <Link to="/settings" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Settings</Link>

          <div className="ml-auto flex items-center gap-4">
            {isInstallable && !isInstalled && (
              <button
                onClick={install}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Install App</span>
              </button>
            )}
            {currentUser ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">Hi, {currentUser.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Login</Link>
            )}
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journals" element={
              <ProtectedRoute><JournalPage /></ProtectedRoute>
            } />
            <Route path="/journals/:id" element={
              <ProtectedRoute><JournalDetailPage /></ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute><SettingsPage /></ProtectedRoute>
            } />
            <Route path="/auth" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <InstallProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </InstallProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
