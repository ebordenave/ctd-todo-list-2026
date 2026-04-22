import { TodoListItem } from './TodoListItem'

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        // <Component propName={value}
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}
export default TodoList
