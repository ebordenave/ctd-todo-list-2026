function TextInputWithLabel({ labelText, elementId, ref, ...props }) {
  return (
    <div>
      <label htmlFor={elementId}>{labelText}</label>
      <input id={elementId} ref={ref} {...props} />
    </div>
  )
}

export default TextInputWithLabel
