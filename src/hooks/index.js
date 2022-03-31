import { useState } from 'react'

export const useTextField = (label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    id: `${label}Input`,
    type: 'text',
    value,
    label,
    onChange,
  }
}
