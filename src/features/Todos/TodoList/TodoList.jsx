import { TodoListItem } from './TodoListItem'
import { useMemo } from 'react'

function TodoList({
  todoList = [],
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
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
      todos: result,
    }
  }, [todoList, dataVersion, statusFilter])

  return (
    <ul className="space-y-4">
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList
