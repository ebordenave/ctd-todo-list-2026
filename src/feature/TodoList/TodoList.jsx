import { TodoListItem } from './TodoListItem'
// In TodoList, destructure that helper out of the
// component's props then pass it to TodoListItem in the same manner.

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted)
  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
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
