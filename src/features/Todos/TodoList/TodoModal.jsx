import { useEffect, useRef, useState } from 'react'
import { BUTTON_SCHEME } from '../../../utils/themeSchemes'

export default function TodoModal({ isOpen, onClose, onAddTodo }) {
  const dialogRef = useRef(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTodo(title)
      setTitle('')
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="rounded-xl p-6 shadow-xl backdrop:bg-zinc-900/50 w-full max-w-sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-800">Add New Task</h2>

        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-zinc-200 rounded-xl focus:outline-none focus:border-blue-500"
          autoFocus
        />

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 border border-zinc-200 text-zinc-600 rounded-xl hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2.5 bg-[oklch(45%_0.24_264)] text-white font-medium rounded-xl hover:bg-[oklch(38%_0.24_264)] transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  )
}
