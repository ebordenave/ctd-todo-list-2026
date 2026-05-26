import { useState, useEffect, useCallback } from 'react'
import TodoList from './TodoList/TodoList'
import TodoForm from './TodoForm'
import SortBy from '../../shared/SortBy'
import useDebounce from '../../hooks/useDebounce'
import FilterInput from '../../shared/FilterInput'

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([])
  const [error, setError] = useState('')
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)
  const [sortBy, setSortBy] = useState('creationDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterTerm, setFilterTerm] = useState('')

  // TODO:Add filter error state to TodosPage.jsx:
  // Add a new state variable called filterError with an initial value of an empty string
  // Use useState to create the state and setter function
  const [filterError, setFilterError] = useState('')

  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  const [dataVersion, setDataVersion] = useState(0)

  useEffect(() => {
    // TODO: Update error handling in fetchTodos to distinguish error types:
    // } catch (error) {
    //   if (debouncedFilterTerm || sortBy !== 'creationDate' || sortDirection !== 'desc') {
    //     setFilterError(`Error filtering/sorting todos: ${error.message}`);
    //   } else {
    //     setError(`Error fetching todos: ${error.message}`);
    //   }
    // } finally {

    async function fetchTodos() {
      const paramsObject = { sortBy, sortDirection }

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm
      }

      const params = new URLSearchParams(paramsObject)

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
        setFilterError('')
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc'
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`)
        } else {
          setError(`Error fetching todos: ${error.message}`)
        }
        setTodoList([]) //not sure if this is necessary
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
  }, [token, sortBy, sortDirection, debouncedFilterTerm])

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

      invalidateCache()
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

    invalidateCache()
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
    invalidateCache()
  }

  function handleFilterChange(newTerm) {
    setFilterTerm(newTerm)
  }

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1)
    // console.log('Invalidating memo cache after todo mutation')
  }, [])

  // TODO: Add filter error UI after the elements for the existing error:
  // Create a conditional block that displays when filterError has a value
  // Inside the block, create a div containing:
  // A paragraph element displaying the filter error message
  // A "Clear Filter Error" button that calls setFilterError('') when clicked
  // A "Reset Filters" button that when clicked:
  // Clears the filter term: setFilterTerm('')
  // Resets sort by: setSortBy('creationDate')
  // Resets sort direction: setSortDirection('desc')
  // Clears the filter error: setFilterError('')

  return (
    <div>
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            onClick={() => {
              setFilterError('')
            }}
          >
            Clear Error
          </button>
          <button
            onClick={() => {
              setFilterTerm('')
              setSortBy('creationDate')
              setSortDirection('desc')
              setFilterError('')
            }}
          >
            Reset Error
          </button>
        </div>
      )}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')} type="button">
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <div>Loading...</div>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={Array.isArray(todoList) ? todoList : []}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  )
}

export default TodosPage
