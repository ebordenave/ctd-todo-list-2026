import { CONTROL_BAR_SCHEME } from '../utils/theme-config'

function TextInputWithLabel({ labelText, elementId, ref, ...props }) {
  return (
    <div>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        id={elementId}
        ref={ref}
        className={CONTROL_BAR_SCHEME.input}
        {...props}
      />
    </div>
  )
}

export default TextInputWithLabel
