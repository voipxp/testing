import { useQuery, useMutation } from '@apollo/react-hooks'
import { useCallback, useMemo } from 'react'
import { APP_QUERY, APP_UPDATE_MUTATION } from '@/graphql'

export const useApp = () => {
  const { data } = useQuery(APP_QUERY)
  return (data && data.app) || {}
}

export const useLoadingModal = () => {
  const [mutate] = useMutation(APP_UPDATE_MUTATION)
  const update = useCallback(loading => mutate({ variables: { input: { loading } } }), [mutate])
  return useMemo(
    () => ({
      hide: () => update(false),
      show: () => update(true)
    }),
    [update]
  )
}
