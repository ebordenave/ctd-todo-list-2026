import { useState } from 'react'

function TodoForm({ setTodoList }) {
  const [todoTitle, setTodoTitle] = useState('')

  // add handle function for submit event
  function handleSubmit(e) {
    e.preventDefault()
    if (todoTitle.trim() == '') return

    // Create a new todo here
    const newTodo = {
      title: todoTitle,
      id: Date.now(), // unique id here
    }

    // console.log(todoTitle)

    setTodoList((prevTodoList) => [...prevTodoList, newTodo])
    setTodoTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}
export default TodoForm
