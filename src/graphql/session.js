import gql from 'graphql-tag'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { useCallback } from 'react'
import { setToken } from '@/api'
import { client } from '@/apollo'

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

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(TOKEN_KEY)
  setToken()
  return client.writeQuery({
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
}

const saveSession = session => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  localStorage.setItem(TOKEN_KEY, session.token)
  setToken(session.token)
}

export const useSession = () => {
  const session = useQuery(SESSION_QUERY, { fetchPolicy: 'cache-only' })
  return session.data.session || {}
}

export const useSessionLogin = () => {
  return useMutation(SESSION_LOGIN, {
    update: (cache, res) => saveSession(res.data.sessionLogin)
  })
}

export const useSessionLogout = () => clearSession

export const useSessionRefresh = () => {
  return useMutation(SESSION_REFRESH, {
    update: (cache, res) => saveSession(res.data.sessionRefresh),
    onError: err => {}
  })
}
