import { useEffect, useRef, useState } from 'react'
import { BUTTON_SCHEME, MODAL_SCHEME } from '../../../utils/themeSchemes'

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
    <dialog ref={dialogRef} onClose={onClose} className={MODAL_SCHEME.dialog}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-zinc-800">Add New Task</h2>

        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={MODAL_SCHEME.input}
          autoFocus
        />

        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className={BUTTON_SCHEME.secondary}
          >
            Cancel
          </button>
          <button type="submit" className={BUTTON_SCHEME.primary}>
            Save
          </button>
        </div>
      </form>
    </dialog>
  )
}
