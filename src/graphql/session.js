import gql from 'graphql-tag'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { useCallback } from 'react'
import { setToken } from '@/api'

const SESSION_KEY = 'odin:session'
const TOKEN_KEY = 'odin:token'

export const SESSION_FRAGMENT = gql`
  fragment SessionFragment on Session {
    _id
    encoding
    groupId
    isEnterprise
    local
    loginType
    passwordExpiresDays
    serviceProviderId
    token
    userDomain
    userId
    softwareVersion
  }
`

export const SESSION_QUERY = gql`
  query session {
    session {
      ...SessionFragment
    }
    ${SESSION_FRAGMENT}
  }
`

const SESSION_LOGIN = gql`
  mutation sessionLogin($username: String!, $password: String!) {
    sessionLogin(username: $username, password: $password) {
      ...SessionFragment
    }
    ${SESSION_FRAGMENT}
  }
`

const SESSION_REFRESH = gql`
  mutation sessionRefresh {
    sessionRefresh {
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`

export const sessionLogout = client => {
  client.writeQuery({
    query: SESSION_QUERY,
    data: {
      session: {
        __typename: 'Session',
        _id: '_session',
        encoding: null,
        groupId: null,
        isEnterprise: null,
        local: null,
        loginType: null,
        passwordExpiresDays: null,
        serviceProviderId: null,
        token: null,
        userDomain: null,
        userId: null,
        softwareVersion: null
      }
    }
  })
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

export const useSession = () => {
  const client = useApolloClient()
  const session = useQuery(SESSION_QUERY, { fetchPolicy: 'cache-only' })
  /* Saving to localstorage because this is where angular pulls from */
  const [sessionLogin] = useMutation(SESSION_LOGIN, {
    update(cache, res) {
      const session = res.data.sessionLogin
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setToken(session.token)
    }
  })
  /* Saving to localstorage because this is where angular pulls from */
  const [sessionRefresh] = useMutation(SESSION_REFRESH, {
    update(cache, res) {
      const session = res.data.sessionRefresh
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      setToken(session.token)
    }
  })
  return {
    session: session.data.session || {},
    sessionLogout: useCallback(() => sessionLogout(client), [client]),
    sessionLogin,
    sessionRefresh
  }
}
