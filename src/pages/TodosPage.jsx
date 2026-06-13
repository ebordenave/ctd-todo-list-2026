import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer'

import { useReducer, useEffect } from 'react'
import TodoList from '../features/Todos/TodoList/TodoList'
import TodoForm from '../features/Todos/TodoForm'
import SortBy from '../shared/SortBy'
import useDebounce from '../hooks/useDebounce'
import FilterInput from '../shared/FilterInput'
import useAuth from '../contexts/AuthContext'

import { useSearchParams } from 'react-router'
import StatusFilter from '../shared/StatusFilter'

function TodosPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get('status') || 'all'

  function handleStatusChange(newStatus) {
    const params = new URLSearchParams(searchParams)
    if (newStatus === 'all') {
      params.delete('status')
    } else {
      params.set('status', newStatus)
    }
    setSearchParams(params)
  }

  const { token } = useAuth()

  const [state, dispatch] = useReducer(todoReducer, initialTodoState)
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state

  const debouncedFilterTerm = useDebounce(filterTerm, 300)

  useEffect(() => {
    async function fetchTodos() {
      //! look here
      const paramsObject = { sortBy, sortDirection, status: statusFilter }

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm
      }

      const params = new URLSearchParams(paramsObject)

      try {
        dispatch({ type: TODO_ACTIONS.FETCH_START })

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

        const todos = await response.json()

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: todos.tasks,
        })
      } catch (error) {
        const isFilteringActive = !!(
          debouncedFilterTerm ||
          sortBy !== 'creationAt' ||
          sortDirection !== 'desc'
        )

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilteringActive
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilteringActive: isFilteringActive,
          },
        })
      }
    }
    fetchTodos()
  }, [token, sortBy, sortDirection, debouncedFilterTerm, statusFilter])

  async function addTodo(todoTitle) {
    const newTodoObject = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: {
        newTodo: newTodoObject,
      },
    })

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

      const actualTodo = await response.json()

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          actualTodo: actualTodo,
          tempId: newTodoObject.id,
        },
      })
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          message: error.message,
          tempId: newTodoObject.id,
        },
      })
    }
  }

  async function completeTodo(id) {
    const todo = todoList.find((todo) => todo.id === id)
    if (!todo) return

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id: id },
    })

    try {
      // const createdAtValue = originalTodo ? originalTodo.createdAt : undefined

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: !todo.isCompleted,
          // createdAt: createdAtValue, //! backend mismatch
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
      const finalizedTodo = await response.json()
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: finalizedTodo,
      })
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          error: error.message,
          id: id,
        },
      })
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id)

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: editedTodo,
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

      const finalizedTodo = await response.json()

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: finalizedTodo,
      })
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          message: error.message,
          editedTodo,
          originalTodo,
        },
      })
    }
  }

  function handleFilterChange(newTerm) {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    })
  }

  return (
    <div>
      <StatusFilter
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
      />
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Error
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
          >
            Reset Filters
          </button>
        </div>
      )}

      {error && (
        <div>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <div>Loading...</div>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSort) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: newSort, sortDirection },
          })
        }
        onSortDirectionChange={(newDir) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy, sortDirection: newDir },
          })
        }
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
        statusFilter={statusFilter}
      />
    </div>
  )
}

export default TodosPage
