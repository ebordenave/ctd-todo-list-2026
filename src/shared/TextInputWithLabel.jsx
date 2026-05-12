// Add a label and an input that are wrapped in a React fragment to the
// return statement. Don't worry about props for now.

function TextInputWithLabel({ elementId, ref, onChange, labelText, value }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        ref={ref}
        type="text"
        id={elementId}
        name="todoTitle"
        placeholder={'Todo text'}
        required
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default TextInputWithLabel
