import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'
import camelCase from 'lodash/camelCase'
import gql from 'graphql-tag'
import { useSession } from '@/graphql'

const UI_QUERY = gql`
  query uiModules {
    uiModules {
      _id
      name
      alias
      description
      url
      provisioningCreate
      provisioningRead
      provisioningUpdate
      provisioningDelete
      serviceProviderCreate
      serviceProviderRead
      serviceProviderUpdate
      serviceProviderDelete
      groupCreate
      groupRead
      groupUpdate
      groupDelete
      userCreate
      userRead
      userUpdate
      userDelete
    }
  }
`

const getModule = (name, modules) => {
  if (!name) return
  const moduleName = name.serviceName || name.name || name
  return modules.find(m => m.name === moduleName)
}

const hasModulePermission = (name, loginType, modules, permission) => {
  const module = getModule(name, modules)
  const perm = camelCase(`${loginType}${permission}`)
  return module ? module[perm] : false
}

const hasModuleCreate = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'Create')
}

const hasModuleRead = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'Read')
}

const hasModuleUpdate = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'Update')
}

const hasModuleDelete = (name, loginType, modules) => {
  return hasModulePermission(name, loginType, modules, 'Delete')
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
  const { session } = useSession()
  const { data } = useQuery(UI_QUERY)
  const uiModules = get(data, 'uiModules', [])
  return {
    getModule: useCallback(
      name => {
        return getModule(name, uiModules)
      },
      [uiModules]
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
    hasModuleCreate: useCallback(
      name => {
        return hasModuleCreate(name, session.loginType, uiModules)
      },
      [session.loginType, uiModules]
    ),
    hasModuleRead: useCallback(
      name => {
        return hasModuleRead(name, session.loginType, uiModules)
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
