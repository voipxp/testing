import camelCase from 'lodash/camelCase'
import { useReduxState } from 'reactive-react-redux'
import { useCallback } from 'react'

const getModule = (name, modules) => {
  const moduleName = name.serviceName || name.name || name
  return modules[moduleName]
}

const hasModulePermission = (name, loginType, modules, permission) => {
  const module = getModule(name, modules)
  return module ? module.permissions[camelCase(loginType)][permission] : true
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
  const { session, ui } = useReduxState()
  return {
    hasModulePermission: useCallback(
      (name, permission) => {
        return hasModulePermission(
          name,
          session.loginType,
          ui.modules,
          permission
        )
      },
      [session.loginType, ui.modules]
    ),
    hasModuleRead: useCallback(
      name => {
        return hasModuleRead(name, session.loginType, ui.modules)
      },
      [session.loginType, ui.modules]
    ),
    hasModuleWrite: useCallback(
      name => {
        return hasModuleWrite(name, session.loginType, ui.modules)
      },
      [session.loginType, ui.modules]
    ),
    hasModuleUpdate: useCallback(
      name => {
        return hasModuleUpdate(name, session.loginType, ui.modules)
      },
      [session.loginType, ui.modules]
    ),
    hasModuleDelete: useCallback(
      name => {
        return hasModuleDelete(name, session.loginType, ui.modules)
      },
      [session.loginType, ui.modules]
    ),
    moduleAlias: useCallback(
      name => {
        return moduleAlias(name, ui.modules)
      },
      [ui.modules]
    ),
    moduleDescription: useCallback(
      name => {
        return moduleDescription(name, ui.modules)
      },
      [ui.modules]
    )
  }
}
