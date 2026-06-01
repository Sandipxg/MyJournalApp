import { useState, useEffect, useRef } from "react"

function JournalForm({ addJournal, editingJournal, updateJournal }) {
  const [title, setTitle] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (editingJournal) {
      setTitle(editingJournal.title)
    } else {
      setTitle("")
    }
  }, [editingJournal])

  function handleSubmit(event) {
    event.preventDefault()
    if (title.trim() === "") {
      alert("Entry cannot be empty")
      return
    }
    if (editingJournal) {
      updateJournal({ ...editingJournal, title })
    } else {
      addJournal({ title })
    }
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Write a journal entry..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
      >
        {editingJournal ? "Update" : "Add"}
      </button>
    </form>
  )
}

export default JournalForm
