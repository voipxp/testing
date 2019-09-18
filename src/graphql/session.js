import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { setToken } from '@/api'

export const TOKEN_KEY = 'odin:token'

const SESSION_FRAGMENT = gql`
  fragment SessionFragment on Session {
    _id
    groupId
    serviceProviderId
    resellerId
    isEnterprise
    encoding
    local
    loginType
    passwordExpiresDays
    token
    userDomain
    userId
    softwareVersion
    isPaasAdmin
  }
`

export const SESSION_QUERY = gql`
  query session {
    session @client {
      ...SessionFragment
    }
    ${SESSION_FRAGMENT}
  }
`

const SESSION_LOGIN = gql`
  mutation sessionLogin($username: String!, $password: String!, $oldPassword: String) {
    sessionLogin(username: $username, password: $password, oldPassword: $oldPassword) {
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

const SESSION_PASSWORD_UPDATE_MUTATION = gql`
  mutation sessionPasswordUpdate($oldPassword: String!, $password: String!) {
    sessionPasswordUpdate(oldPassword: $oldPassword, password: $password) {
      ...SessionFragment
    }
    ${SESSION_FRAGMENT}
  }
`

const SESSION_LOGOUT = gql`
  mutation sessionLogout {
    sessionLogout @client {
      ...SessionFragment
    }
    ${SESSION_FRAGMENT}
  }
`

export const SESSION_DEFAULT = {
  session: {
    __typename: 'Session',
    _id: '_session',
    encoding: null,
    groupId: null,
    isEnterprise: null,
    resellerId: null,
    local: null,
    loginType: null,
    passwordExpiresDays: null,
    serviceProviderId: null,
    token: null,
    userDomain: null,
    userId: null,
    softwareVersion: null,
    isPaasAdmin: null
  }
}

export const sessionLogout = client => {
  client.writeQuery({ query: SESSION_QUERY, data: SESSION_DEFAULT })
  client.resetStore()
  return SESSION_DEFAULT.session
}

export const saveToken = token => {
  localStorage.setItem(TOKEN_KEY, token)
  setToken(token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  setToken()
}

export const useSession = () => {
  const { data } = useQuery(SESSION_QUERY)
  return (data && data.session) || {}
}

export const useSessionLogin = () => {
  return useMutation(SESSION_LOGIN, {
    update: (cache, res) => saveToken(res.data.sessionLogin.token)
  })
}

export const useSessionRefresh = () => {
  return useMutation(SESSION_REFRESH, {
    update: (cache, res) => saveToken(res.data.sessionRefresh.token)
  })
}

export const useSessionPasswordUpdate = () => {
  return useMutation(SESSION_PASSWORD_UPDATE_MUTATION, {
    update: (cache, res) => saveToken(res.data.sessionPasswordUpdate.token)
  })
}

export const useSessionLogout = () => {
  return useMutation(SESSION_LOGOUT, {
    update: (cache, res) => clearToken()
  })
}