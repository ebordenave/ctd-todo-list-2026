function TextInputWithLabel({
  elementId,
  inputRef,
  onChange,
  labelText,
  value,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        ref={inputRef}
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
