import { useState, useEffect, useCallback } from 'react'

export const useForm = (initialState, formRef) => {
  const [isValid, setValid] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(initialState)
  const checkValidity = useCallback(() => {
    if (formRef && formRef.current) {
      const validity = formRef.current.checkValidity()
      const formData = new FormData(formRef.current)
      const newErrors = [...formData.keys()].reduce((acc, key) => {
        acc[key] = formRef.current.elements[key].validationMessage
        return acc
      }, {})
      setValid(validity)
      setErrors(newErrors)
    }
  }, [formRef])
  // re-run checkValidity when the form object is changed
  // for example, when selecting a row in a table
  useEffect(() => checkValidity(), [checkValidity, form])
  const onChange = ({ target }) => {
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    checkValidity()
    setForm({ ...form, [name]: value })
  }
  return { form, setForm, onChange, isValid, errors }
}
