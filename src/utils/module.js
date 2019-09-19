import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import camelCase from 'lodash/camelCase'
import { UI_MODULES_QUERY } from '@/graphql'
import { useSession } from '@/utils'

const show = (name, modules) => {
  if (!name) return
  const moduleName = name.serviceName || name.name || name
  return modules.find(m => m.name === moduleName)
}

const hasPermission = (name, loginType, modules, permission) => {
  if (loginType === 'System') return true
  const module = show(name, modules)
  const perm = camelCase(`${loginType}${permission}`)
  return module ? module[perm] : false
}

const hasCreate = (name, loginType, modules) => {
  return hasPermission(name, loginType, modules, 'Create')
}

const hasRead = (name, loginType, modules) => {
  return hasPermission(name, loginType, modules, 'Read')
}

const hasUpdate = (name, loginType, modules) => {
  return hasPermission(name, loginType, modules, 'Update')
}

const hasDelete = (name, loginType, modules) => {
  return hasPermission(name, loginType, modules, 'Delete')
}

const alias = (name, modules) => {
  const module = show(name, modules)
  return (module && module.alias) || name
}

const description = (name, modules) => {
  const module = show(name, modules)
  return module && module.description
}

export const useModulePermissions = () => {
  const session = useSession()
  const { data, loading, error } = useQuery(UI_MODULES_QUERY)
  const uiModules = get(data, 'uiModules', [])
  return {
    error,
    loading,
    show: useCallback(name => show(name, uiModules), [uiModules]),
    alias: useCallback(name => alias(name, uiModules), [uiModules]),
    description: useCallback(name => description(name, uiModules), [uiModules]),
    hasPermission: useCallback(
      (name, permission) => hasPermission(name, session.loginType, uiModules, permission),
      [session.loginType, uiModules]
    ),
    hasCreate: useCallback(name => hasCreate(name, session.loginType, uiModules), [
      session.loginType,
      uiModules
    ]),
    hasRead: useCallback(name => hasRead(name, session.loginType, uiModules), [
      session.loginType,
      uiModules
    ]),
    hasUpdate: useCallback(name => hasUpdate(name, session.loginType, uiModules), [
      session.loginType,
      uiModules
    ]),
    hasDelete: useCallback(name => hasDelete(name, session.loginType, uiModules), [
      session.loginType,
      uiModules
    ])
  }
}
