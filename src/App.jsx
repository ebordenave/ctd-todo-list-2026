import './App.css'
import { useState } from 'react'
const todos = [
  { id: 1, title: 'review resources' },
  { id: 2, title: 'take notes' },
  { id: 3, title: 'code out app' },
]

function App() {
  const [todoList, setTodoList] = useState(todos)
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
