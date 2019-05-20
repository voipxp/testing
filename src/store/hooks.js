import { useCallback, useMemo } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useAction = action => {
  const dispatch = useDispatch()
  return useCallback((...args) => dispatch(action(...args)), [action, dispatch])
}

/*
  TODO: investigate these
  https://react-redux.js.org/next/api/hooks#hooks-recipes
*/
export function useActions(actions, deps) {
  const dispatch = useDispatch()
  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch))
    }
    return bindActionCreators(actions, dispatch)
  }, [actions, dispatch])
}

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
