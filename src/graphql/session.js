import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { setToken } from '@/api'
import { client } from '@/apollo'

export const TOKEN_KEY = 'odin:token'

export const SESSION_FRAGMENT = gql`
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

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY)
  setToken()
  // clear out the session so the app knows
  // to show the login page
  client.writeQuery({
    query: SESSION_QUERY,
    data: {
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
  })
  // reset the store to remove anything from the local cache
  return client.resetStore()
}

const saveSession = session => {
  console.log('saveSession', session)
  localStorage.setItem(TOKEN_KEY, session.token)
  setToken(session.token)
}

export const useSession = () => {
  const { data } = useQuery(SESSION_QUERY, { fetchPolicy: 'cache-only' })
  return (data && data.session) || {}
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

export const useSessionPasswordUpdate = () => {
  return useMutation(SESSION_PASSWORD_UPDATE_MUTATION, {
    update: (cache, res) => saveSession(res.data.sessionPasswordUpdate)
  })
}
