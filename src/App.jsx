import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useContext } from "react"
import { ThemeProvider } from "./context/ThemeContext"
import ThemeContext from "./context/ThemeContext"

import HomePage from "./pages/Homepage"
import JournalPage from "./pages/Journalpage"
import JournalDetailPage from "./pages/JournalDetailPage"
import SettingsPage from "./pages/Settingpage"
import LoginPage from "./pages/Loginpage"
import ProtectedRoute from "./components/ProtectedRoute"

function AppLayout() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-6">
          <Link to="/" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Home</Link>
          <Link to="/journals" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Journals</Link>
          <Link to="/settings" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Settings</Link>
          <Link to="/auth" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">auth</Link>
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
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
