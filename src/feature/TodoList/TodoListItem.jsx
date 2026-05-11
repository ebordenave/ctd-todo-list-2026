// In the TodoListItem component:
// Add a state variable isEditing and its associated state update function.
// Use an initialValue of false;
// Import TextInputWithLabel component.
// In the return statement, create a ternary statement that evaluates isEditing
// If true, display an instance of TextInputWithLabel with its props value set to todo.title.
// We will update all props later.
// If false, display the existing form and its contents. The form will contain the checkbox input and the todo title.
// Surround the {todo.title} with a span element.
// Add an onClick handler to the span that toggles the isEditing state value to true.
import { useState } from 'react'
import TextInputWithLabel from '../../shared/TextInputWithLabel'

function TodoListItem({ todo, onCompleteTodo }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <li>
      <form>
        {isEditing ? (
          <TextInputWithLabel value={todo.title} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  )
}

export { TodoListItem }
