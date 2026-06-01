import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { currentUser, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState(currentUser?.username || "")
  const [password, setPassword] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

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
