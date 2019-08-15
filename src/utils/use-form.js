import { useState, useEffect, useCallback } from 'react'

export const useForm = (initialState, formRef) => {
  const [isValid, setValid] = useState(false)
  const [form, setForm] = useState(initialState)
  const checkValidity = useCallback(() => {
    if (formRef && formRef.current) setValid(formRef.current.checkValidity())
  }, [formRef])
  useEffect(() => checkValidity(), [checkValidity])
  const onChange = ({ target }) => {
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    checkValidity()
    setForm({ ...form, [name]: value })
  }
  return [form, onChange, isValid]
}
