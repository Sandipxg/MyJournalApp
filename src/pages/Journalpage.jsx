import { useState, useEffect } from "react"
import JournalForm from "../components/JournalForm"
import JournalList from "../components/JournalList"
import ErrorBoundary from "../components/ErrorBoundary"

function JournalPage() {
  const [journalList, setJournals] = useState(() => {
    const savedJournals = localStorage.getItem("journals")
    return savedJournals ? JSON.parse(savedJournals) : []
  })
  const [editingJournal, setEditingJournal] = useState(null)
  const [searchText, setSearchText] = useState("")

  function addJournal(newEntry) {
    setJournals([...journalList, newEntry])
  }

  function deleteJournal(id) {
    setJournals(journalList.filter((journal) => journal.id !== id))
  }

  function startEditing(journal) {
    setEditingJournal(journal)
  }

  function updateJournal(updatedJournal) {
    setJournals(journalList.map((journal) =>
      journal.id === updatedJournal.id ? updatedJournal : journal
    ))
    setEditingJournal(null)
  }

  const filteredJournals = journalList.filter((journal) =>
    journal.title.toLowerCase().includes(searchText.toLowerCase())
  )

  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journalList))
  }, [journalList])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Journal</h1>
      <JournalForm
        addJournal={addJournal}
        editingJournal={editingJournal}
        updateJournal={updateJournal}
      />
      <input
        type="text"
        placeholder="Search journals..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <div className="mt-6">
        <ErrorBoundary>
          <JournalList
            journals={filteredJournals}
            deleteJournal={deleteJournal}
            startEditing={startEditing}
          />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default JournalPage
