import { useNavigate } from "react-router-dom"

function JournalCard({ journal, deleteJournal, startEditing }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400 mb-1">#{journal.id}</p>
        <p className="text-base font-medium text-gray-800 dark:text-gray-100">{journal.title}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/journals/${journal.id}`)}
          className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => startEditing(journal)}
          className="text-sm px-3 py-1 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => deleteJournal(journal.id)}
          className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JournalCard
