//=====
//! state = The Warehouse Inventory
//! Represents the exact status of the world right now (e.g., current todos, loading status, errors).

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
  sortBy: 'creationDate', // creationDate vs createdDate
  sortDirection: 'desc', // same here, uses desc but CTD uses asc
  filterTerm: '',
  filterError: '',
  dataVersion: 0,
}

// reducer takes in state AND action args
export function todoReducer(state, action) {
  console.log('Dispatched action:', action.type, action.payload)
  // case switches here for each state (the switch depends on the action and its type property)
  switch (action.type) {
    //! use these as a guide -- also refer to lesson-09 for examples
    case TODO_ACTIONS.FETCH_START:
      // 1. Turn on the loading indicator (set to true)
      // 2. Clear out any previous fetch errors
      // 3. Clear out any previous filter/sorting errors
      // 4. Return the updated state, keeping everything else the same
      return { ...state, isTodoListLoading: true, error: '', filterError: '' }

    case TODO_ACTIONS.FETCH_SUCCESS:
      // 1. Turn off the loading indicator (set to false)
      // 2. Clear out any previous filter/sorting errors
      // 3. Update the todoList array with the data from action.payload
      // 4. Return the updated state, keeping everything else the same
      return {
        ...state,
        filterError: '',
        error: '',
        todoList: action.payload,
      }

    case TODO_ACTIONS.FETCH_ERROR:
      // 1. Turn off the loading indicator (set to false)
      // 2. Reset the todoList array to an empty list [] to avoid showing stale data
      // 3. Check if filtering/sorting was active (using criteria from action.payload)
      //    - IF active: Set filterError to the error message, clear generic error
      //    - ELSE: Set generic error to the error message, clear filterError
      // 4. Return the updated state, keeping everything else the same
      return {
        ...state,
        isTodoListLoading: false,
        todoList: [],
        filterError: action.payload.isFilteringActive
          ? action.payload.message
          : '',
        error: action.payload.isFilteringActive ? '' : action.payload.message,
        // return updated state
      }

    case TODO_ACTIONS.ADD_TODO_START:
      // 1. Clear out any previous generic errors (error: '')
      // 2. Clear out any previous filter/sorting errors (filterError: '')
      // 3. Update todoList by placing the new todo (from action.payload)
      //    at the front of the existing state.todoList array (I THINK THIS BELONGS IN ADD_TODO_SUCCESS)
      // 4. Return the updated state, keeping everything else the same
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: true,
        todoList: [action.payload.newTodoObject, ...state.todoList],
      }

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      // 1. Clear out any previous generic or filter errors
      // 2. Update the todoList by mapping over the existing state.todoList:
      //    - If the todo matches the temporary ID, replace it with the real server todo
      //    - Otherwise, leave the todo exactly as it is
      // 3. Return the updated state
      return {
        ...state,
        error: '',
        filterError: '',
        todoList: state.todoList.map((tempTodo) => {
          return tempTodo.id === action.payload.newTodoObject.id
            ? action.payload.newTodoObject
            : tempTodo
        }),
      }

    case TODO_ACTIONS.ADD_TODO_ERROR:
      // previous.filter((todo) => todo.id !== newTodoObject.id)
      return {
        ...state,
        isTodoListLoading: false,
        todoList: state.todoList.slice(1, state.todoList.length),
        error: action.payload,
        filterError: '',
      }

    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
      }

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        error: '',
        filterError: '',
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.id
            ? { ...currentTodo, isCompleted: true }
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
        error: action.payload.message,
        filterError: '',
      }

    case TODO_ACTIONS.UPDATE_TODO_START:
      // same as complete start
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
      }

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      // currentTodo is the current todo being scan during loop
      // updatedTodo is action.payload
      return {
        ...state,
        error: '',
        filterError: '',
        isTodoListLoading: false,
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.id
            ? action.payload
            : currentTodo
        }),
      }

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: state.todoList.map((currentTodo) => {
          return currentTodo.id === action.payload.todo.id
            ? action.payload.todo
            : currentTodo
        }),
        error: action.payload.message,
        filterError: '',
      }
    //! UI ACTIONS
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        isTodoListLoading: false,
        error: '',
        filterError: '',
        sortBy: action.payload.sortBy, //'creationDate'
        sortDirection: action.payload.sortDirection, //'desc'
      }

    case TODO_ACTIONS.SET_FILTER:
      // action.payload is "what to set the filter by"
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
        sortBy: 'creationDate',
        sortDirection: 'desc',
      }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
