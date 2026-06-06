//=====
//! state = The Warehouse Inventory
//! Represents the exact status of the world right now

import { TodoListItem } from '../features/Todos/TodoList/TodoListItem'

//! action = The Delivery Truck
//! An object arriving from the outside world. It always carries an instruction type (action.type) telling the warehouse manager what to do.

//! action.payload = The Cargo
//! The specific data package sitting inside the truck (like a new todo or an error message) needed to carry out the instruction.

export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',

  // Add todo operations
  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  // Complete todo operations
  COMPLETE_TODO_START: 'COMPLETE_TODO_START',
  COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
  COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

  // Update todo operations
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  // UI operations
  SET_SORT: 'SET_SORT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  RESET_FILTERS: 'RESET_FILTERS',
}

export const initialState = {
  todoList: [],
  error: '',
  isTodoListLoading: false, //note: my original useState uses an initialValue of false but CTD template uses true
  sortBy: 'createdAt',
  sortDirection: 'desc', // same here, uses desc but CTD uses asc
  filterTerm: '',
  filterError: '',
  dataVersion: 0,
}

// reducer takes in state AND action args
export function todoReducer(state, action) {
  console.log('Dispatched action:', action.type, action.payload)

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
          // ✅ FIXED: Safely unpacks the id out of the cargo object
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: true }
            : todo
        }),
      }

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        error: '',
        filterError: '',
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.id
            ? { ...currentTodo, ...action.payload } // ✅ FIXED: Merges safe properties
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
          // ✅ FIXED: Safely finds and partially merges the update fields
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
          return currentTodo.id === action.payload.editedTodo.id
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
    //! WHERE IS THIS USED?
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

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
