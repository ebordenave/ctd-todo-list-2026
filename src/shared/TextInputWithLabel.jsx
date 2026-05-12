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
