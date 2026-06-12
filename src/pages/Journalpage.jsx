import { useState, useEffect } from "react"
import JournalForm from "../components/JournalForm"
import JournalList from "../components/JournalList"
import ErrorBoundary from "../components/ErrorBoundary"
import { useAuth } from "../context/AuthContext"
import { fetchJournals, createJournal, updateJournal, deleteJournal } from "../services/journalService"

function JournalPage() {
  const { currentUser } = useAuth()
  const [journalList, setJournals] = useState([])
  const [editingJournal, setEditingJournal] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJournals()
      .then(setJournals)
      .catch(err => setError(err.message))
  }, [])

  async function addJournal(newEntry) {
    try {
      const created = await createJournal(newEntry.title)
      setJournals(prev => [...prev, created])
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteJournal(id)
      setJournals(prev => prev.filter(j => j.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(updatedJournal) {
    try {
      const saved = await updateJournal(updatedJournal.id, { title: updatedJournal.title })
      setJournals(prev => prev.map(j => j.id === saved.id ? saved : j))
      setEditingJournal(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const filtered = journalList.filter(j =>
    j.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Journal</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <JournalForm
        addJournal={addJournal}
        editingJournal={editingJournal}
        updateJournal={handleUpdate}
      />
      <input
        type="text"
        aria-label="Search journals"
        placeholder="Search journals..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full mt-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <div className="mt-6">
        <ErrorBoundary>
          <JournalList
            journals={filtered}
            deleteJournal={handleDelete}
            startEditing={setEditingJournal}
          />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default JournalPage
