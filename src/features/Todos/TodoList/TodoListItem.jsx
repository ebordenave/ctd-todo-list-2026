import { useEditableTitle } from '../../../hooks/useEditableTitle'
import TextInputWithLabel from '../../../shared/TextInputWithLabel'
import { isValidTodoTitle } from '../../../utils/todoValidation'

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title)

  const handleEdit = (e) => updateTitle(e.target.value)

  // function handleUpdate(e) {
  //   // takes event object
  //   // if isEditing is false, return immediately to exit the function
  //   if (!isEditing) {
  //     return
  //   }
  //   // calls event.preventDefault()
  //   e.preventDefault()
  //   // calls onUpdateTodo and pass in an object that destructures
  //   // todo and sets the title equal to workingTitle.
  //   onUpdateTodo({ ...todo, title: workingTitle })
  //   // sets isEditing state value to false.
  //   setIsEditing(false)
  // }
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
              elementId={todo.id}
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
