import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer'
import DOMPurify from 'dompurify'

import { useReducer, useEffect } from 'react'
import TodoList from '../features/Todos/TodoList/TodoList'
import TodoForm from '../features/Todos/TodoForm'
import SortBy from '../shared/SortBy'
import useDebounce from '../hooks/useDebounce'
import FilterInput from '../shared/FilterInput'
import useAuth from '../contexts/AuthContext'
import Header from '../shared/Header'

import { useState } from 'react'
import { BUTTON_SCHEME, CONTROL_BAR_SCHEME } from '../utils/theme-config'
import TodoModal from '../features/Todos/TodoList/TodoModal'
import { SquareCheckBig, UserCircle } from 'lucide-react'

import { useSearchParams } from 'react-router'
import StatusFilter from '../shared/StatusFilter'
import GradientSpinner from '../shared/GradientSpinner'

function TodosPage() {
  const { token } = useAuth()
  const [searchParams] = useSearchParams()
  const statusFilter = searchParams.get('status') || 'all'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', type: null })

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
      const paramsObject = {
        sortBy,
        sortDirection,
        status: statusFilter,
        limit: 100,
      }

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
          sortBy !== 'createdAt' ||
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
    const sanitizedTodoTitle = DOMPurify.sanitize(todoTitle)
    const newTodoObject = {
      id: Date.now(),
      title: sanitizedTodoTitle,
      isCompleted: false,
    }

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { newTodo: newTodoObject },
    })

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: sanitizedTodoTitle, isCompleted: false }),
      })

      if (!response.ok) throw new Error('Failed to add task')

      const actualTodo = await response.json()
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: { actualTodo, tempId: newTodoObject.id },
      })
      setToast({ message: 'Task successfully added!', type: 'success' })
      setTimeout(() => setToast(''), 3000)
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: { message: error.message, tempId: newTodoObject.id },
      })
    }
  }

  async function completeTodo(id) {
    const todo = todoList.find((todo) => todo.id === id)
    if (!todo) return

    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: { id } })

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      })

      if (!response.ok) throw new Error('Failed to update status')
      const finalizedTodo = await response.json()
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: finalizedTodo,
      })
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: { error: error.message, id },
      })
    }
  }

  async function updateTodo(editedTodo) {
    const sanitizedEditedTodoTitle = DOMPurify.sanitize(editedTodo.title)
    const sanitizedEditedTodo = {
      ...editedTodo,
      title: sanitizedEditedTodoTitle,
    }
    const originalTodo = todoList.find(
      (todo) => todo.id === sanitizedEditedTodo.id,
    )
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: sanitizedEditedTodo,
    })

    try {
      const response = await fetch(`/api/tasks/${sanitizedEditedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: sanitizedEditedTodoTitle,
          isCompleted: sanitizedEditedTodo.isCompleted,
        }),
      })

      if (!response.ok) throw new Error('Failed to update task')
      const finalizedTodo = await response.json()
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: finalizedTodo,
      })
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: { message: error.message, sanitizedEditedTodo, originalTodo },
      })
    }
  }

  async function deleteTodo(currentTodo) {
    dispatch({ type: TODO_ACTIONS.DELETE_TODO_START, payload: currentTodo })

    try {
      const res = await fetch(`/api/tasks/${currentTodo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          id: currentTodo.id,
        }),
      })

      if (!res.ok) throw new Error('Failed to delete task')
      const finalizedTodo = await res.json()

      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
        payload: finalizedTodo,
      })
      setToast({ message: 'Task successfully deleted!', type: 'deleted' })
      setTimeout(() => setToast({ message: '' }), 3000)
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_ERROR,
        payload: { message: error.message, originalTodo: currentTodo },
      })
    }
  }

  function handleFilterChange(newTerm) {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: { filterTerm: newTerm },
    })
  }
  const toastBgColor =
    toast.type === 'deleted'
      ? 'bg-red-50 text-red-800 border-red-200'
      : 'bg-emerald-100 text-emerald-800 border-emerald-200'

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-normal text-zinc-800 mb-4">My Tasks</h1>
      {toast.message && (
        <div
          className={`mb-4 p-3 rounded-md border shadow-sm transition-all ${toastBgColor}`}
        >
          {toast.message}
        </div>
      )}
      <div className="relative">
        <section className={CONTROL_BAR_SCHEME.container}>
          <FilterInput
            filterTerm={filterTerm}
            onFilterChange={handleFilterChange}
          />
          <StatusFilter />
          {(filterError || error) && (
            <div>
              <p>{filterError || error}</p>
              <button
                type="button"
                onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
              >
                Clear Error
              </button>
              {filterError && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
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
        </section>
        {isTodoListLoading && (
          <div>
            <GradientSpinner />
          </div>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <TodoList
          todoList={Array.isArray(todoList) ? todoList : []}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          dataVersion={dataVersion}
          statusFilter={statusFilter}
        />
      </div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`${BUTTON_SCHEME.primary} mt-4 mb-8`}
      >
        + Add Todo
      </button>

      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTodo={addTodo}
        />
      )}
    </div>
  )
}

export default TodosPage
