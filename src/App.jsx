import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"

import HomePage from "./pages/Homepage"
import JournalPage from "./pages/Journalpage"
import JournalDetailPage from "./pages/JournalDetailPage"
import SettingsPage from "./pages/Settingpage"
import LoginPage from "./pages/Loginpage"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <nav className="bg-white border-b border-gray-200 px-6 py-4 flex gap-6">
            <Link to="/" className="text-purple-600 font-medium hover:text-purple-800">Home</Link>
            <Link to="/journals" className="text-purple-600 font-medium hover:text-purple-800">Journals</Link>
            <Link to="/settings" className="text-purple-600 font-medium hover:text-purple-800">Settings</Link>
            <Link to="/auth" className="text-purple-600 font-medium hover:text-purple-800">auth</Link>

          </nav>
          <main className="max-w-3xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/journals" element={<JournalPage />} />
              <Route path="/journals/:id" element={<JournalDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/auth" element={<LoginPage />} />

            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
