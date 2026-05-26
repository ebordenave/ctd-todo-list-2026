import { TodoListItem } from './TodoListItem'
import { useMemo } from 'react'

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
