// fcd
function TodoListItem({ todo }) {
  return <li key={todo.id}>{todo.title}</li>
}

export { TodoListItem }
