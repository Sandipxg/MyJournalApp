import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from "react-router-dom"
import { useContext, lazy, Suspense } from "react"
import { ThemeProvider } from "./context/ThemeContext"
import ThemeContext from "./context/ThemeContext"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { InstallProvider, useInstall } from './context/InstallContext'

import ProtectedRoute from "./components/ProtectedRoute"
import ErrorBoundary from "./components/ErrorBoundary"

const HomePage = lazy(() => import("./pages/Homepage"))
const JournalPage = lazy(() => import("./pages/Journalpage"))
const JournalDetailPage = lazy(() => import("./pages/JournalDetailPage"))
const SettingsPage = lazy(() => import("./pages/Settingpage"))
const LoginPage = lazy(() => import("./pages/Loginpage"))

// SVG icons for the bottom nav bar
function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function JournalIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">Loading page...</p>
    </div>
  )
}

function AppLayout() {
  const { theme } = useContext(ThemeContext)
  const { currentUser, logout } = useAuth()
  const { isInstallable, isInstalled, install } = useInstall()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/auth")
  }

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 px-4 py-1 text-xs font-medium transition-colors ${
      isActive
        ? "text-purple-600 dark:text-purple-400"
        : "text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
    }`

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

        {/* ── Top Header ── */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4 flex items-center gap-6">

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Home</Link>
            <Link to="/journals" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Journals</Link>
            <Link to="/settings" className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800">Settings</Link>
          </div>

          {/* App brand — visible on mobile since the nav links are hidden */}
          <span className="md:hidden font-semibold text-purple-600 dark:text-purple-400 text-base">My Journal</span>

          {/* Right-side controls */}
          <div className="ml-auto flex items-center gap-3">
            {isInstallable && !isInstalled && (
              <button
                onClick={install}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}
            {currentUser ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Hi, {currentUser.username}</span>
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

        {/* ── Main Content ── */}
        {/* pb-24 on mobile leaves room above the bottom nav bar */}
        <main className="max-w-3xl mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* ── Mobile Bottom Navigation Bar — hidden on md+ ── */}
        {currentUser && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex md:hidden justify-around py-2 shadow-lg">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <HomeIcon className={`w-5 h-5 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"}`} />
                  <span>Home</span>
                </>
              )}
            </NavLink>
            <NavLink to="/journals" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <JournalIcon className={`w-5 h-5 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"}`} />
                  <span>Journals</span>
                </>
              )}
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <SettingsIcon className={`w-5 h-5 ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"}`} />
                  <span>Settings</span>
                </>
              )}
            </NavLink>
          </nav>
        )}

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
