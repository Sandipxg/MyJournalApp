import { useNavigate } from "react-router-dom"

function JournalCard({ journal, deleteJournal, startEditing }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400 mb-1">#{journal.id}</p>
        <p className="text-base font-medium text-gray-800">{journal.title}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/journals/${journal.id}`)}
          className="text-sm px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => startEditing(journal)}
          className="text-sm px-3 py-1 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => deleteJournal(journal.id)}
          className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JournalCard
