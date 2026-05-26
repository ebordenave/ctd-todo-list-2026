import { TodoListItem } from './TodoListItem'
import { useMemo } from 'react'

//TODO: Update src/features/Todos/TodoList/TodoList.jsx:
// Add dataVersion as a prop to the component function parameters
// Create a memoized filteredTodoList using useMemo
// Inside the useMemo function:
// Add a console.log message: "Recalculating filtered todos (v${dataVersion})"
// Return an object with version and todos properties
// Set version to dataVersion and todos to the filtered todoList that excludes completed todos
// Include both todoList and dataVersion in the dependency array
// Use filteredTodoList.todos instead of todoList in your JSX rendering

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`)

    const activeTodoList = todoList.filter((todo) => !todo.isCompleted)

    return {
      version: dataVersion,
      todos: activeTodoList,
    }
  }, [todoList, dataVersion])

  return (
    <div>
      {filteredTodoList.todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((todo) => (
            <TodoListItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoList
// Pass Handler Through Components
// In App.jsx, add an onCompleteTodo prop to the TodoList component, passing in your completeTodo function
// In TodoList.jsx, add onCompleteTodo to the component's props using destructuring
// Pass the onCompleteTodo prop to each TodoListItem component instance
