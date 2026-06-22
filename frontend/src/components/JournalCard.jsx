import { useNavigate } from "react-router-dom"

function JournalCard({ journal, deleteJournal, startEditing }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">#{journal.id}</p>
        <p className="text-base font-medium text-gray-800 dark:text-gray-100 truncate">{journal.title}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => navigate(`/journals/${journal.id}`)}
          className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => startEditing(journal)}
          className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-lg border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => deleteJournal(journal.id)}
          className="flex-1 sm:flex-none text-sm px-3 py-2 rounded-lg border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JournalCard
