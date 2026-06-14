import { TodoListItem } from './TodoListItem'
import { useMemo } from 'react'

function TodoList({
  todoList = [],
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = 'all',
}) {
  const filteredTodoList = useMemo(() => {
    let result = todoList
    if (statusFilter === 'active') {
      result = todoList.filter((todo) => !todo.isCompleted)
    } else if (statusFilter === 'completed') {
      result = todoList.filter((todo) => todo.isCompleted)
    }

    return {
      version: dataVersion,
      todos: result, //! which means this result should be the todos that show
    }
  }, [todoList, dataVersion, statusFilter]) //! could it be because my dependencies are different?

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet. Complete some tasks to see them here.'
      case 'active':
        return 'No active todos. Add a todo above to get started.'
      case 'all':
      default:
        return 'Add todo above to get started.'
    }
  }

  if (filteredTodoList.todos.length === 0) {
    return <p>{getEmptyMessage()}</p>
  }

  return (
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
  )
}

export default TodoList
