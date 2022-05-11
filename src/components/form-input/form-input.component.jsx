import './form-input.styles.scss'

export default function FormInput({ label, ...otherProps }) {
  const { value } = otherProps
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className={`form-input-label ${value.length ? 'shrink' : ''}`}>{label} </label>
      )}
    </div>
  )
}
