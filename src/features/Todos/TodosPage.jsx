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

  // TODO: Add two new state variables after existing state: sortBy with initial value creationDate' and sortDirection with initial value 'desc'
  const [sortBy, setSortBy] = useState('creationDate')
  const [sortDirection, setSortDirection] = useState('desc')

  // TODO: Add filter state after existing state in TodosPage.jsx: Import useDebounce from your utils directory at the top of the file. Add the filter state variables:
  const [filterTerm, setFilterTerm] = useState('')
  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  // TODO: Add a new state variable called dataVersion with an initial value of 0
  const [dataVersion, setDataVersion] = useState(0)

  useEffect(() => {
    async function fetchTodos() {
      // TODO: Modify the fetchTodos function to include sort parameters: Create a URLSearchParams object inside the function with sortBy and sortDirection properties Update the fetch URL to append the params to the base /tasks endpoint using template literals

      // TODO: Update fetchTodos function to include filter when present:
      // Modify your existing URLSearchParams creation to conditionally include the find property
      // Start with an object containing your sort parameters: { sortBy, sortDirection }
      // Use an if statement to check if debouncedFilterTerm has a value
      // If it does, add the find property to the object: if (debouncedFilterTerm) { paramsObject.find = debouncedFilterTerm; }
      // Then create the URLSearchParams with this object

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
      } catch (error) {
        setError(error.message)
        setTodoList([])
      } finally {
        setIsTodoListLoading(false)
      }
    }
    fetchTodos()
    // TODO: Add debouncedFilterTerm to your existing dependency array
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
      // TODO: Call invalidateCache after successful mutations. Add this line after each successful API operation in addTodo, completeTodo, and updateTodo:
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
    // TODO: Call invalidateCache after successful mutations. Add this line after each successful API operation in addTodo, completeTodo, and updateTodo:
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
    // TODO: Call invalidateCache after successful mutations. Add this line after each successful API operation in addTodo, completeTodo, and updateTodo:
    invalidateCache()
  }

  // TODO:Create filter handler function:
  // Create a function that accepts the new filter term and calls setFilterTerm
  // Name the function something descriptive like handleFilterChange
  // No need for useCallback since this function is simple and only calls setState
  // Pattern: const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); };
  function handleFilterChange(newTerm) {
    setFilterTerm(newTerm)
  }

  // TODO: Create cache invalidation function:
  // Create a function called invalidateCache using useCallback
  // The function should increment dataVersion by 1 using the functional update form: setDataVersion(prev => prev + 1)
  // Include a console.log message: "Invalidating memo cache after todo mutation"
  // Use an empty dependency array since it only uses the setState function and the functional update form
  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1)
    console.log('Invalidating memo cache after todo mutation')
  }, [])

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
      Pass the current sort state values and setState functions as props (recall the name of the props we added in the component definipwdtion) sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,*/}
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
