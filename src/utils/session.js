import { useQuery, useMutation } from '@apollo/react-hooks'
import { setToken } from '@/api'
import {
  SESSION_QUERY,
  SESSION_DEFAULT,
  SESSION_LOGIN,
  SESSION_LOGOUT,
  SESSION_REFRESH,
  SESSION_PASSWORD_UPDATE_MUTATION
} from '@/graphql'

export const TOKEN_KEY = 'odin:token'

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
