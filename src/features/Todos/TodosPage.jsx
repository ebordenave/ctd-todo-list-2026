import { useState, useEffect } from 'react'
import TodoList from './TodoList/TodoList'
import TodoForm from './TodoForm'
import SortBy from '../../shared/SortBy'

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState('')
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)

  // TODO:Add two new state variables after existing state: sortBy with initial value creationDate' and sortDirection with initial value 'desc'
  const [sortBy, setSortBy] = useState('creationDate')
  const [sortDirection, setSortDirection] = useState('desc')

  useEffect(() => {
    async function fetchTodos() {
      // TODO: Modify the fetchTodos function to include sort parameters: Create a URLSearchParams object inside the function with sortBy and sortDirection properties Update the fetch URL to append the params to the base /tasks endpoint using template literals
      const params = new URLSearchParams({
        sortBy,
        sortDirection,
      })

      try {
        setIsTodoListLoading(true)
        setError('')

        const response = await fetch(`/api/tasks?${params}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        })

        if (!response.ok) {
          const errorMessage =
            response.status === 401
              ? `Unauthorized Error: ${response.status}`
              : `Generic Error: ${response.status}`
          throw new Error(errorMessage)
        }

        const data = await response.json()

        setTodoList(data.tasks || data.task || [])
      } catch (error) {
        setError(error.message)
        setTodoList([])
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
    // TODO: Update useEffect dependencies to re-fetch when sort options change: Add sortBy and sortDirection to the dependency array alongside the existing token
  }, [token, sortBy, sortDirection])

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
      {/* TODO: Integrate SortBy in TodosPage.jsx: Place the component above TodoForm in the JSX 
      Pass the current sort state values and setState functions as props (recall the name of the props we added in the component definition) sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,*/}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
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
