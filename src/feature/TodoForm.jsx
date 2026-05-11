import { useRef, useState } from 'react'

import TextInputWithLabel from '../shared/TextInputWithLabel'
import { isValidTodoTitle } from '../utils/todoValidation'

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('')
  const inputRef = useRef()

  const handleAddTodo = (e) => {
    e.preventDefault()

    if (workingTodoTitle.trim() && workingTodoTitle.trim() !== '') {
      // call the onAddTodo function, provide the workingRodoTitle
      onAddTodo(workingTodoTitle)
      setWorkingTodoTitle('')
      inputRef.current.focus()
    }
  }

  return (
    // refactor here
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId={'todoTitle'}
        ref={inputRef}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        labelText={'Todo'}
      />
      <button type="submit" disabled={isValidTodoTitle}>
        Add Todo
      </button>
    </form>
  )
}
export default TodoForm
