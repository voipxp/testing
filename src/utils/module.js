import camelCase from 'lodash/camelCase'
import { useReduxState } from 'reactive-react-redux'
import { useCallback } from 'react'

const getModule = (name, loginType, modules) => {
  if (!name) return
  const moduleName = name.serviceName || name.name || name
  const module = modules[moduleName]
  if (!module) return
  const permissions = module.permissions[camelCase(loginType)]
  return { ...module, permissions }
}

const hasModulePermission = (name, loginType, modules, permission) => {
  const module = getModule(name, loginType, modules)
  return module ? module.permissions[permission] : true
}

const hasModuleRead = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'read')
}

const hasModuleWrite = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'write')
}

const hasModuleUpdate = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'update')
}

const hasModuleDelete = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'delete')
}

const moduleAlias = (name, modules) => {
  const module = getModule(name, modules)
  return (module && module.alias) || name
}

const moduleDescription = (name, modules) => {
  const module = getModule(name, modules)
  return module && module.description
}

export const useModulePermissions = () => {
  const { session, uiModules } = useReduxState()
  return {
    getModule: useCallback(
      name => {
        return getModule(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    hasModulePermission: useCallback(
      (name, permission) => {
        return hasModulePermission(
          name,
          session.loginType,
          uiModules,
          permission
        )
      },
      [session.loginType, uiModules]
    ),
    hasModuleRead: useCallback(
      name => {
        return hasModuleRead(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    hasModuleWrite: useCallback(
      name => {
        return hasModuleWrite(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    hasModuleUpdate: useCallback(
      name => {
        return hasModuleUpdate(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    hasModuleDelete: useCallback(
      name => {
        return hasModuleDelete(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    moduleAlias: useCallback(
      name => {
        return moduleAlias(name, uiModules)
      },
      [uiModules]
    ),
    moduleDescription: useCallback(
      name => {
        return moduleDescription(name, uiModules)
      },
      [uiModules]
    )
  }
}
