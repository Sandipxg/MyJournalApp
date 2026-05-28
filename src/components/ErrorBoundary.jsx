import { Component } from "react"

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() { // reacts comes here automatically on render crash 
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <p className="text-red-500 font-medium">Something went wrong.</p>
          <p className="text-gray-400 text-sm mt-1">Try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
