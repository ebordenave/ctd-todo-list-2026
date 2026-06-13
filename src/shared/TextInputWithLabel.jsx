import React, { forwardRef } from 'react'

const TextInputWithLabel = forwardRef(({ label, id, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={ref} {...props} />
    </div>
  )
})

export default TextInputWithLabel
