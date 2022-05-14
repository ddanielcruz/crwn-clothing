import { FormInputLabel, Group, Input } from './form-input.styles.jsx'

export default function FormInput({ label, ...otherProps }) {
  const { value } = otherProps
  return (
    <Group>
      <Input className="form-input" {...otherProps} />
      {label && <FormInputLabel shrink={value.length}>{label} </FormInputLabel>}
    </Group>
  )
}
