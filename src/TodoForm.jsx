import { useRef } from 'react'

// function TodoForm({ setTodoList }) {
function TodoForm({ onAddTodo }) {
  // const [todoTitle, setTodoTitle] = useState('')
  const inputRef = useRef()

  // add handle function for submit event
  // function handleSubmit(e) {
  //   e.preventDefault()
  //   if (todoTitle.trim() == '') return

  //   // Create a new todo here
  //   const newTodo = {
  //     title: todoTitle,
  //     id: Date.now(), // unique id here
  //   }

  //   // console.log(todoTitle)

  //   setTodoList((prevTodoList) => [...prevTodoList, newTodo])
  //   setTodoTitle('')
  // }

  const handleAddTodo = (e) => {
    e.preventDefault()

    // Explore the event object (we'll remove this later)
    // console.log('Event object:', e)
    // console.log('Event target:', e.target)
    // console.log('Input value:', e.target.todoTitle.value)

    // .trim prevents whitespace only todos
    const todoTitle = e.target.todoTitle.value.trim()
    // if todoTitle exists AND does NOT equal EMPTY STRING
    if (todoTitle && todoTitle !== '') {
      // call the onAddTodo function, provide the todoTitle
      onAddTodo(todoTitle)
      // reset something
      e.target.reset()
      // useRef to use the current value and focus on the input form
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        ref={inputRef}
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder={'Todo text'}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}
export default TodoForm
