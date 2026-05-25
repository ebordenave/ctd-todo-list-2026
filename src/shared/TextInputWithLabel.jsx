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
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default TextInputWithLabel
