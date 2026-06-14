function TextInputWithLabel({ label, id, ref, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} ref={ref} {...props} />
    </div>
  )
}

export default TextInputWithLabel
