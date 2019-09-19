import React from 'react'
import { useAlert } from '@/utils'

export const Tester = () => {
  const Alert = useAlert()
  return (
    <>
      <button onClick={() => Alert.success('hello success')}>Add Alert</button>
      <button onClick={() => Alert.warning('hello warning')}>Add Alert</button>
      <button onClick={() => Alert.danger('hello danger')}>Add Alert</button>
    </>
  )
}
