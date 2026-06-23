import { useEditableTitle } from '../../../hooks/useEditableTitle'
import TextInputWithLabel from '../../../shared/TextInputWithLabel'
import { isValidTodoTitle } from '../../../utils/todoValidation'
import { useEffect, useRef } from 'react'
import {
  BUTTON_SCHEME,
  CARD_SCHEME,
  CHECKBOX_SCHEME,
} from '../../../utils/theme-config'
import { Trash2, Check } from 'lucide-react'

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
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

  const handleDelete = (e) => {
    if (todo) {
      e.preventDefault()
      onDeleteTodo(todo)
    }
  }

  return (
    <li className="w-full">
      <form onSubmit={handleUpdate} className="w-full">
        {isEditing ? (
          <fieldset>
            <div className={CARD_SCHEME.container}>
              <TextInputWithLabel
                value={workingTitle}
                onChange={handleEdit}
                elementId={`editTodo${todo.id}`}
                ref={inputRef}
                maxLength={100}
              />
              <div className={'flex flex-row space-x-4 shrink-0'}>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className={BUTTON_SCHEME.secondary}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  disabled={!isValidTodoTitle(workingTitle)}
                  className={BUTTON_SCHEME.primary}
                >
                  Update
                </button>
              </div>
            </div>
          </fieldset>
        ) : (
          <div className={CARD_SCHEME.container}>
            <div className="flex flex-row items-center gap-3">
              <label className="relative flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  id={`checkbox${todo.id}`}
                  checked={todo.isCompleted}
                  onChange={() => onCompleteTodo(todo.id)}
                  className={CHECKBOX_SCHEME.primary}
                />
                {todo.isCompleted && (
                  <Check className="absolute text-white w-3.5 h-3.5 pointer-events-none" />
                )}
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
            <div className="flex flex-row justify-between items-center gap-4 dark:bg-gray-700">
              <button
                type="button"
                className={BUTTON_SCHEME.taskMenu}
                onClick={handleDelete}
              >
                <Trash2 size={24} />
                <span className="sr-only">Delete Todos</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </li>
  )
}

export { TodoListItem }
