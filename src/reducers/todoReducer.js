export const TODO_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',

  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  COMPLETE_TODO_START: 'COMPLETE_TODO_START',
  COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
  COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  DELETE_TODO_START: 'DELETE_TODO_START',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  DELETE_TODO_ERROR: 'DELETE_TODO_ERROR',

  SET_SORT: 'SET_SORT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_FILTERS: 'RESET_FILTERS',
}

export const initialTodoState = {
  todoList: [],
  error: '',
  isTodoListLoading: false,
  sortBy: 'createdAt',
  sortDirection: 'desc',
  filterTerm: '',
  filterError: '',
  dataVersion: 0,
}

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return { ...state, isTodoListLoading: true, error: '', filterError: '' }

    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isTodoListLoading: false,
        filterError: '',
        error: '',
        todoList: action.payload,
      }

    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: [],
        filterError: action.payload.isFilteringActive
          ? action.payload.message
          : '',
        error: action.payload.isFilteringActive ? '' : action.payload.message,
      }

    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: true,
        todoList: [action.payload.newTodo, ...state.todoList],
      }

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: false,
        todoList: state.todoList.map((newTodo) => {
          return newTodo.id === action.payload.tempId
            ? action.payload.actualTodo
            : newTodo
        }),
      }

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.tempId,
        ),
        error: action.payload.message || action.payload,
        filterError: '',
      }

    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: true }
            : todo
        }),
      }

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.id
            ? { ...currentTodo, ...action.payload }
            : currentTodo
        }),
      }

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: false }
            : todo
        }),
        error: action.payload.error,
        filterError: '',
      }

    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.id
            ? { ...currentTodo, ...action.payload }
            : currentTodo
        }),
      }

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: false,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id ? action.payload : todo
        }),
      }

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.todoId
            ? action.payload.originalTodo
            : currentTodo
        }),
        error: action.payload.message,
        filterError: '',
      }

    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      }

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
        filterTerm: action.payload.filterTerm,
      }

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
      }

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
        filterTerm: '',
        sortBy: 'createdAt',
        sortDirection: 'desc',
      }

    case TODO_ACTIONS.DELETE_TODO_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
        todoList: state.todoList.filter((todo) => {
          return todo.id !== action.payload.id
        }),
      }

    case TODO_ACTIONS.DELETE_TODO_SUCCESS:
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: false,
      }

    case TODO_ACTIONS.DELETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        filterError: '',
        isTodoListLoading: false,
        todoList: [action.payload.currentTodo, ...state.todoList],
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
