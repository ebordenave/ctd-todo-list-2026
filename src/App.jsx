import './App.css'
import { useState } from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

// const todos = [
//   { id: 1, title: 'review resources' },
//   { id: 2, title: 'take notes' },
//   { id: 3, title: 'code out app' },
// ]

function App() {
  // const [noun, setNoun] = useState(initialState)
  const [todoList, setTodoList] = useState([])

  /**
   * @param {string} todoTitle
   */
  function addTodo(todoTitle) {
    // Creates a new todo object
    // with an id property set to Date.now() and a title
    // property set to the todoTitle parameter
    const newTodoObject = { id: Date.now(), title: todoTitle }
    // Updating the todoList functionally ( because current state relies on previous state )
    setTodoList((previous) => [newTodoObject, ...previous])
  }

  return (
    <div>
      <h1>My Todos</h1>
      {/* <TodoForm setTodoList={setTodoList} onAddTodo={addTodo} /> */}
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  )
}

export default App
