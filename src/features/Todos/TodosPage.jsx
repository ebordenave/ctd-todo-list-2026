import { useState, useEffect } from 'react'
import TodoList from './TodoList/TodoList'
import TodoForm from './TodoForm'
// import Logon from '../Logon'

// Update src/features/Todos/TodosPage.jsx to add API data fetching
// Update the component to accept and destructure the token prop: function TodosPage({ token })
function TodosPage({ token }) {
  // Add new state variables for:
  const [todoList, setTodoList] = useState([])
  // error (for displaying API errors, default empty string)
  const [error, setError] = useState('')
  // isTodoListLoading (for showing loading state, default false)
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)

  // Create an async function fetchTodos inside a useEffect hook that:
  useEffect(() => {
    async function fetchTodos() {
      // uses try/catch/finally blocks
      try {
        // Sets isTodoListLoading to true
        setIsTodoListLoading(true)
        // Reset error to clear previous errors
        setError('')

        const response = await fetch('/api/tasks', {
          // Makes a GET request to /api/tasks with:
          method: 'GET',
          // X-CSRF-TOKEN header set to the token prop
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          // credentials: 'include'
          credentials: 'include',
        })
        // on unsuccesful
        if (!response.ok) {
          const errorMessage =
            response.status === 401
              ? `Unauthorized Error: ${response.status}`
              : `Generic Error: ${response.status}`
          throw new Error(errorMessage)
        }

        // on successful
        const data = await response.json()
        setTodoList(data.tasks)
      } catch (error) {
        setError(error.message)
        setTodoList([])
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
  }, [token])

  /**
   * @param {string} todoTitle
   */
  // async function addTodo(todoTitle) {
  //   // Creates a new todo object
  //   // with an id property set to Date.now() and a title
  //   // property set to the todoTitle parameter
  //   const newTodoObject = {
  //     id: Date.now(),
  //     title: todoTitle,
  //     isCompleted: false,
  //   }

  //   setError('')
  //   setTodoList((previous) => [newTodoObject, ...previous])

  //   try {
  //     const response = await fetch('/api/tasks', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRF-TOKEN': token,
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ title: todoTitle, isCompleted: false }),
  //     })

  //     // On failure: remove the failed todo from the list and set an error message
  //     if (!response.ok) {
  //       const errorMessage =
  //         response.status === 401
  //           ? `Unauthorized Error: ${response.status}`
  //           : `Generic Error: ${response.status}`
  //       throw new Error(errorMessage)
  //     }
  //     // On success: replace the temporary todo with the real todo from the server response
  //     const data = await response.json()
  //     // Updating the todoList functionally ( because current state relies on previous state )
  //     setTodoList((previous) =>
  //       previous.map((todo) => (todo.id === newTodoObject.id ? data : todo)),
  //     )
  //   } catch (error) {
  //     setError(error.message)
  //     setTodoList((previous) =>
  //       previous.filter((todo) => todo.id !== newTodoObject.id),
  //     )
  //   }
  // }
  async function addTodo(todoTitle) {
    const newTodoObject = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    setError('')

    setTodoList((previous) =>
      Array.isArray(previous) ? [newTodoObject, ...previous] : [newTodoObject],
    )

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      })

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? `Unauthorized Error: ${response.status}`
            : `Generic Error: ${response.status}`
        throw new Error(errorMessage)
      }

      const data = await response.json()

      const actualTodoFromServer = data.task || data

      setTodoList((previous) => {
        if (!Array.isArray(previous)) return []
        return previous.map((todo) =>
          todo.id === newTodoObject.id ? actualTodoFromServer : todo,
        )
      })
    } catch (error) {
      setError(error.message)
      setTodoList((previous) => {
        if (!Array.isArray(previous)) return []
        return previous.filter((todo) => todo.id !== newTodoObject.id)
      })
    }
  }

  // async function completeTodo(id) {
  //   // Store the original todo before making changes (for potential rollback)
  //   setTodoList((currentTodos) =>
  //     currentTodos.map((todo) => {
  //       if (todo.id === id) {
  //         // Optimistically update the todo as completed in state
  //         return { ...todo, isCompleted: true }
  //       } else {
  //         return todo
  //       }
  //     }),
  //   )

  //   // try-catch
  //   try {
  //     const response = await fetch(`/api/tasks/${id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRF-TOKEN': token,
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ isCompleted: true }),
  //     })

  //     // On failure: rollback to the original todo and set error message
  //     if (!response.ok) {
  //       throw new Error('Failed to update task status on the server.')
  //     }
  //   } catch (error) {
  //     setError(error.message)
  //     setTodoList((currentTodos) =>
  //       currentTodos.map((todo) => {
  //         if (todo.id === id) {
  //           return { ...todo, isCompleted: false }
  //         } else {
  //           return todo
  //         }
  //       }),
  //     )
  //   }
  // }

  async function completeTodo(id) {
    let originalTodo = null

    setTodoList((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          originalTodo = { ...todo }
          return { ...todo, isCompleted: true }
        } else {
          return todo
        }
      }),
    )

    try {
      const createdAtValue = originalTodo ? originalTodo.createdAt : undefined

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',

        body: JSON.stringify({
          isCompleted: true,
          createdAt: createdAtValue,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
    } catch (error) {
      setError(error.message)
      setTodoList((currentTodos) =>
        currentTodos.map((todo) => {
          if (todo.id === id && originalTodo) {
            return originalTodo
          } else {
            return todo
          }
        }),
      )
    }
  }

  async function updateTodo(editedTodo) {
    let originalTodo = null

    setTodoList((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === editedTodo.id) {
          originalTodo = { ...todo }
          return editedTodo
        } else {
          return todo
        }
      })
    })

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
          createdAt: editedTodo.createdAt,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
    } catch (error) {
      setError(error.message)

      setTodoList((currentTodos) =>
        currentTodos.map((todo) => {
          if (todo.id === editedTodo.id && originalTodo) {
            return originalTodo
          } else {
            return todo
          }
        }),
      )
    }
  }

  // function clearError() {
  //   setError(null)
  // }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>

          <button onClick={() => setError('')} type="button">
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <div>Loading...</div>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={Array.isArray(todoList) ? todoList : []}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  )
}

export default TodosPage
