import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useInstall } from '../context/InstallContext'

function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { currentUser, deleteAccount } = useAuth()
  const { isInstallable, isInstalled, install } = useInstall()
  const navigate = useNavigate()
  const [username, setUsername] = useState(currentUser?.username || "")
  const [password, setPassword] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  async function handleDeleteAccount(e) {
    e.preventDefault()
    setDeleteError("")
    setIsDeleting(true)

    try {
      await deleteAccount(username, password)
      navigate("/auth")
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Theme</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current: {theme}</p>
        </div>
        <button
          onClick={changeTheme}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      {/* App Installation Experience */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-5 shadow-sm space-y-4">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-gray-100">App Installation</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Install the application on your system for standalone operation and offline mode.
          </p>
        </div>

        {isInstalled ? (
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-lg p-4">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Application Installed</p>
              <p className="text-xs text-green-600 dark:text-green-400">
                You are currently running My Journal App in standalone mode with full offline access.
              </p>
            </div>
          </div>
        ) : isInstallable ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Ready to Install</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Install to add a shortcut to your home screen or desktop for rapid launch.
              </p>
            </div>
            <button
              onClick={install}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Install App
            </button>
          </div>
        ) : isIOS ? (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Install on iOS (Safari)</p>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              To install on your iPhone or iPad, tap the <strong className="font-semibold">Share</strong> button in Safari's menu bar and select <strong className="font-semibold">Add to Home Screen</strong>.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700/50 rounded-lg p-4">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Running in Browser</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                To enable app installation, please access this app using Google Chrome or Microsoft Edge.
              </p>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleDeleteAccount}
        className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg px-6 py-5 shadow-sm space-y-4"
      >
        <div>
          <p className="font-medium text-red-600 dark:text-red-400">Delete account</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This removes your account and all journals linked to it.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Confirm password"
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}

        <button
          type="submit"
          disabled={isDeleting}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete account"}
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
