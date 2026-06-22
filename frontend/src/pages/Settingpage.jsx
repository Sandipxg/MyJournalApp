import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useInstall } from '../context/InstallContext'
import {
  subscribeUserToPush,
  unsubscribeUserFromPush,
  getSubscriptionState,
  triggerTestPush
} from "../services/pushService"

function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { currentUser, deleteAccount, updateReminderSettings } = useAuth()
  const { isInstallable, isInstalled, install } = useInstall()
  const navigate = useNavigate()
  const [username, setUsername] = useState(currentUser?.username || "")
  const [password, setPassword] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Push notification permissions and subscription states
  const [permission, setPermission] = useState(() => typeof Notification !== 'undefined' ? Notification.permission : 'default')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [pushLoading, setPushLoading] = useState(false)
  const [pushError, setPushError] = useState("")
  const [pushSuccess, setPushSuccess] = useState("")

  // Daily reminder settings states
  const [reminderEnabled, setReminderEnabled] = useState(() => currentUser?.reminderTime !== null)
  const [reminderTime, setReminderTime] = useState(() => currentUser?.reminderTime || '20:00')
  const [reminderLoading, setReminderLoading] = useState(false)
  const [reminderSuccess, setReminderSuccess] = useState("")
  const [reminderError, setReminderError] = useState("")

  // Save reminder schedule preferences to database
  async function handleSaveReminder(e) {
    e.preventDefault()
    setReminderError("")
    setReminderSuccess("")
    setReminderLoading(true)

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
      const targetTime = reminderEnabled ? reminderTime : null
      await updateReminderSettings(targetTime, tz)
      setReminderSuccess("Reminder settings updated successfully!")
    } catch (err) {
      setReminderError(err.message || 'Failed to update reminder settings.')
    } finally {
      setReminderLoading(false)
    }
  }

  // Check initial subscription status on mount
  useEffect(() => {
    async function checkSubscription() {
      try {
        const subscribed = await getSubscriptionState()
        setIsSubscribed(subscribed)
      } catch (err) {
        console.error('Failed to get subscription state:', err)
      }
    }
    checkSubscription()
  }, [])

  // Toggle subscriptions (Subscribe/Unsubscribe or Ask Permission)
  async function handleToggleNotifications() {
    setPushError("")
    setPushSuccess("")
    setPushLoading(true)

    try {
      if (permission === 'denied') {
        throw new Error('Notifications are blocked by your browser settings.')
      }

      let currentPermission = permission
      if (currentPermission === 'default') {
        const result = await Notification.requestPermission()
        setPermission(result)
        currentPermission = result
      }

      if (currentPermission === 'granted') {
        if (isSubscribed) {
          await unsubscribeUserFromPush()
          setIsSubscribed(false)
          setPushSuccess("Successfully unsubscribed from notifications.")
        } else {
          await subscribeUserToPush()
          setIsSubscribed(true)
          setPushSuccess("Successfully subscribed to notifications!")
        }
      } else {
        throw new Error('Permission to show notifications was denied.')
      }
    } catch (err) {
      setPushError(err.message || 'An error occurred while updating notification settings.')
    } finally {
      setPushLoading(false)
    }
  }

  // Send a test notification to verified active subscriptions
  async function handleSendTestPush() {
    setPushError("")
    setPushSuccess("")
    setPushLoading(true)

    try {
      const result = await triggerTestPush()
      setPushSuccess(result.message || "Test push notification dispatched!")
    } catch (err) {
      setPushError(err.message || 'Failed to trigger test push notification.')
    } finally {
      setPushLoading(false)
    }
  }

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
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 md:px-6 py-4 md:py-5 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Theme</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current: {theme}</p>
        </div>
        <button
          onClick={changeTheme}
          className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Switch to {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      {/* App Installation Experience */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 md:px-6 py-4 md:py-5 shadow-sm space-y-4">
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

      {/* Push Notifications Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 md:px-6 py-4 md:py-5 shadow-sm space-y-4">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-gray-100">Push Notifications</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Receive reminders and notifications to write in your journal and keep your streak alive.
          </p>
        </div>

        {permission === 'denied' ? (
          <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Notifications Blocked</p>
              <p className="text-xs text-red-600 dark:text-red-400">
                You have blocked notifications for this site. To receive notifications, please click the lock icon in your browser address bar and change the notification setting to 'Allow'.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                {permission === 'granted' && isSubscribed ? 'Notifications Enabled' : 'Enable System Reminders'}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                {permission === 'granted' && isSubscribed 
                  ? 'Your device is registered to receive push notifications.' 
                  : 'Subscribe to start receiving real-time reminders.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {permission === 'granted' && isSubscribed && (
                <button
                  onClick={handleSendTestPush}
                  disabled={pushLoading}
                  className="bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-gray-600 border border-purple-200 dark:border-gray-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap"
                >
                  Send Test Push
                </button>
              )}
              <button
                onClick={handleToggleNotifications}
                disabled={pushLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-60 cursor-pointer whitespace-nowrap"
              >
                {pushLoading ? 'Processing...' : (permission === 'granted' && isSubscribed ? 'Disable' : 'Enable')}
              </button>
            </div>
          </div>
        )}

        {pushError && (
          <p className="text-red-500 text-sm font-medium mt-1">{pushError}</p>
        )}
        {pushSuccess && (
          <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">{pushSuccess}</p>
        )}
      </div>

      {/* Daily Reminders Section */}
      <form
        onSubmit={handleSaveReminder}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 md:px-6 py-4 md:py-5 shadow-sm space-y-4"
      >
        <div>
          <h2 className="font-medium text-gray-800 dark:text-gray-100">Daily Reminders</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Schedule a daily alert to prompt you to write. Helps build your journaling habit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <input
              id="reminder-toggle"
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="reminder-toggle" className="text-sm font-medium text-purple-800 dark:text-purple-300 cursor-pointer select-none">
              Enable Daily Reminders
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="time"
              value={reminderTime}
              disabled={!reminderEnabled}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-3 py-1.5 border border-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50 transition-opacity"
            />
            <button
              type="submit"
              disabled={reminderLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-60 cursor-pointer whitespace-nowrap"
            >
              {reminderLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Display detected timezone */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Detected Timezone: <strong className="font-semibold">{Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'}</strong>
        </p>

        {(!isSubscribed || permission !== 'granted') && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-3 flex items-start gap-2.5">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Note: Please enable **Push Notifications** above so your device is registered to receive these scheduled reminders.
            </p>
          </div>
        )}

        {reminderError && (
          <p className="text-red-500 text-sm font-medium mt-1">{reminderError}</p>
        )}
        {reminderSuccess && (
          <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">{reminderSuccess}</p>
        )}
      </form>

      <form
        onSubmit={handleDeleteAccount}
        className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg px-4 md:px-6 py-4 md:py-5 shadow-sm space-y-4"
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
          className="w-full sm:w-auto bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete account"}
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
