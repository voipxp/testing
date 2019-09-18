import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useCallback, useMemo } from 'react'

export const APP_QUERY = gql`
  query app {
    app @client {
      _id
      loading
    }
  }
`

export const APP_DEFAULT = {
  app: {
    __typename: 'App',
    _id: '_app',
    loading: false
  }
}

export const APP_UPDATE_MUTATION = gql`
  mutation appUpdate($input: AppInput!) {
    appUpdate(input: $input) @client {
      _id
      loading
    }
  }
`

export const appUpdate = (cache, input) => {
  const { app } = cache.readQuery({ query: APP_QUERY })
  const data = { ...app, ...input }
  cache.writeQuery({ query: APP_QUERY, data })
  return data
}

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
