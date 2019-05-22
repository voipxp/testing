import { useMemo } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useAction = action => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(action, dispatch), [action, dispatch])
}

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
