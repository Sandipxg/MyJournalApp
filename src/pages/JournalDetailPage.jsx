import { useParams, useNavigate } from "react-router-dom"

function JournalDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Read journals from localStorage and find the one matching the id
  const journals = JSON.parse(localStorage.getItem("journals") || "[]")
  const entry = journals.find((j) => j.id === Number(id))

  if (!entry) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Journal entry not found.</p>
        <button
          onClick={() => navigate("/journals")}
          className="mt-4 text-purple-600 hover:underline text-sm"
        >
          ← Back to journals
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-6 py-8 shadow-sm">
      <button
        onClick={() => navigate("/journals")}
        className="text-sm text-purple-600 hover:underline mb-6 block"
      >
        ← Back to journals
      </button>

      <p className="text-xs text-gray-400 mb-1">#{entry.id}</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{entry.title}</h1>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.body}</p>
    </div>
  )
}

export default JournalDetailPage
