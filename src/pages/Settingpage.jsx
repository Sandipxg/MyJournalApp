import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"

function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-800">Theme</p>
          <p className="text-sm text-gray-500">Current: {theme}</p>
        </div>
        <button
          onClick={changeTheme}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  )
}

export default SettingsPage
