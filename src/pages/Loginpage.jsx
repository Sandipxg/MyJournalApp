import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useQuote from "../hooks/useQuote"

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [authError, setAuthError] = useState("")
  const { signup, login } = useAuth()
  const navigate = useNavigate()
  const { quote, loading } = useQuote()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  function onSubmit(data) {
    setAuthError("")
    try {
      if (isSignup) {
        signup(data.username, data.password)
      } else {
        login(data.username, data.password)
      }
      reset()
      navigate("/journals")
    } catch (err) {
      setAuthError(err.message)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {isSignup ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {isSignup ? "Sign up to get started" : "Sign in to your account"}
        </p>

        {!loading && quote && (
          <div className="mb-6 border-l-2 border-purple-400 pl-3">
            <p className="text-xs italic text-gray-500 dark:text-gray-400">"{quote.quote}"</p>
            <p className="text-xs text-purple-500 mt-1">— {quote.author}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Enter your username"
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
              type="password"
              placeholder="Enter your password"
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {authError && <p className="text-red-500 text-xs">{authError}</p>}

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors mt-2"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => { setIsSignup(!isSignup); setAuthError(""); reset() }}
            className="text-purple-600 ml-1 hover:underline"
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>

      </div>
    </div>
  )
}

export default LoginPage
