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
    const newTodoObject = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }
    // Updating the todoList functionally ( because current state relies on previous state )
    setTodoList((previous) => [newTodoObject, ...previous])
  }

  function completeTodo(id) {
    const newTodoList = todoList.map((todo) => {
      // if it matches
      if (todo.id === id) {
        return { ...todo, isCompleted: true }
      } else {
        return todo
      }
    })
    // update the todolist state with the resulting array
    setTodoList(newTodoList)
  }

  return (
    <div>
      <h1>My Todos</h1>
      {/* <TodoForm setTodoList={setTodoList} onAddTodo={addTodo} /> */}
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  )
}

export default App

// Update Todo Data Structure
// In App.jsx, find the addTodo function and update the new todo object to include an isCompleted property set to false
// Each todo should now have three properties: id, title, and isCompleted
