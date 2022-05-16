import { FC, InputHTMLAttributes } from 'react'
import { FormInputLabel, Group, Input } from './form-input.styles'

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  const { value } = otherProps
  const shouldShrink = Boolean(value && typeof value === 'string' && value.length)

  return (
    <Group>
      <Input className="form-input" {...otherProps} />
      {label && <FormInputLabel shrink={shouldShrink}>{label} </FormInputLabel>}
    </Group>
  )
}

export default FormInput
