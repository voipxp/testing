import { useCallback } from 'react'
import { useReduxDispatch } from 'reactive-react-redux'

export const useAction = action => {
  const dispatch = useReduxDispatch()
  return useCallback((...args) => dispatch(action(...args)), [action, dispatch])
}
