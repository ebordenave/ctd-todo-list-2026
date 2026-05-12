import { useState } from 'react'

export function useEditableTitle(initialTitle) {
  // create state isEditing using useState hook
  const [isEditing, setIsEditing] = useState(false)
  // create state workingTitle using useState hook
  const [workingTitle, setWorkingTitle] = useState(initialTitle)

  // create arrow function "startEditing" that will not take any params
  // in this function, set the working title to the initialTitle
  // set isEditing to be true
  const startEditing = () => {
    setWorkingTitle(initialTitle)
    setIsEditing(true)
  }

  // create an arrow function "cancelEdit"
  // this function will reset the title back to the initialTitle
  // and change the isEditing state to false
  const cancelEdit = () => {
    setWorkingTitle(initialTitle)
    setIsEditing(false)
  }

  // create an arrow function "updateTitle"
  // that sets the workingTitle to the new title
  const updateTitle = (newTitle) => {
    setWorkingTitle(newTitle)
  }

  // create an arrow function "finishEdit"
  // that sets isEdit to false
  // and returns the workingTitle
  const finishEdit = () => {
    setIsEditing(false)
    return workingTitle
  }

  return {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  }
}
