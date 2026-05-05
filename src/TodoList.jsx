import { TodoListItem } from './TodoListItem'
// Filter Completed Todos
// In TodoList.jsx, create a filteredTodoList constant that filters out todos where isCompleted is true
// Replace all references to todoList in the JSX with filteredTodoList
function TodoList({ todoList, onCompleteTodo }) {
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
