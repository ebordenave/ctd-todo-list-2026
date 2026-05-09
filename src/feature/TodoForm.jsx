import { useRef, useState } from 'react'

// function TodoForm({ setTodoList }) {
function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('')

  const inputRef = useRef()

  // add handle function for submit event
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   if (todoTitle.trim() == '') return

  //   // Create a new todo here
  //   const newTodo = {
  //     title: todoTitle,
  //     id: Date.now(), // unique id here
  //   }

  //   // console.log(todoTitle)

  //   setTodoList((prevTodoList) => [...prevTodoList, newTodo])
  //   setTodoTitle('')
  // }

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
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        ref={inputRef}
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder={'Todo text'}
        required
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  )
}
export default TodoForm
