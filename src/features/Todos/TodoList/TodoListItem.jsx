import { useEditableTitle } from '../../../hooks/useEditableTitle'
import TextInputWithLabel from '../../../shared/TextInputWithLabel'
import { isValidTodoTitle } from '../../../utils/todoValidation'
import { useEffect, useRef } from 'react'

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const inputRef = useRef()
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title)

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleEdit = (e) => updateTitle(e.target.value)

  const handleUpdate = (e) => {
    if (!isEditing) return
    e.preventDefault()
    const finalTitle = finishEdit()
    onUpdateTodo({ ...todo, title: finalTitle })
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId={`editTodo${todo.id}`}
              labelText={'Todo'}
              ref={inputRef}
            />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              type="button"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => startEditing()}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  )
}

export { TodoListItem }
