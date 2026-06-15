import { useEditableTitle } from '../../../hooks/useEditableTitle'
import TextInputWithLabel from '../../../shared/TextInputWithLabel'
import { isValidTodoTitle } from '../../../utils/todoValidation'
import { useEffect, useRef } from 'react'
import { CARD_SCHEME } from '../../../utils/themeSchemes'

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
          <fieldset>
            <div className={CARD_SCHEME.container}>
              <TextInputWithLabel
                value={workingTitle}
                onChange={handleEdit}
                elementId={`editTodo${todo.id}`}
                labelText={'Todo'}
                ref={inputRef}
              />
              <div className="flex flex-row space-x-4">
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
              </div>
            </div>
          </fieldset>
        ) : (
          <div className={CARD_SCHEME.container}>
            <div className="flex flex-row items-center gap-3">
              {/**child 1 */}
              <label>
                <input
                  type="checkbox"
                  id={`checkbox${todo.id}`}
                  checked={todo.isCompleted}
                  onChange={() => onCompleteTodo(todo.id)}
                />
              </label>
              <section className="flex flex-col items-start">
                <span
                  onClick={() => startEditing()}
                  className={`${CARD_SCHEME.title} ${todo.isCompleted ? 'line-through text-zinc-400' : ''}`}
                >
                  {todo.title}
                </span>
                {todo.isCompleted ? (
                  <small className="text-xs text-zinc-500">Completed</small>
                ) : (
                  <small className="text-xs text-zinc-500">
                    {'Created: ' +
                      new Date(todo.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                  </small>
                )}
              </section>
            </div>
            <div>
              <button
                type="button"
                className="text-zinc-400 hover:text-zinc-600 text-4xl"
              >
                &#8942;
              </button>
            </div>
          </div>
        )}
      </form>
    </li>
  )
}

export { TodoListItem }
