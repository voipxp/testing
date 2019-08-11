import React from 'react'
import PropTypes from 'prop-types'
import { UiMenu, UiLoadingCard } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import {
  useUserServicePermissions,
  useModulePermissions,
  useAcl
} from '@/utils'
import { dashboardMenu } from './user-dashboard-menu'

export const UserDashboard = ({ match }) => {
  const { userId } = match.params
  const Acl = useAcl()
  const Permissions = useUserServicePermissions(userId)
  const Module = useModulePermissions()

  // filter items we should not see
  const menu = React.useMemo(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.version && !Acl.hasVersion(item.version)) return false
        if (item.acl && !Acl.hasLevel(item.acl)) return false
        if (
          item.services &&
          !item.services.find(s => Permissions.hasUserService(s))
        ) {
          return false
        }
        if (item.module && !Module.hasRead(item.module)) return false
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [Acl, Module, Permissions])

  return (
    <>
      <AppBreadcrumb />
      {Permissions.loading || Module.loading ? (
        <UiLoadingCard />
      ) : (
        <UiMenu menu={menu} />
      )}
    </>
  )
}

UserDashboard.propTypes = { match: PropTypes.object.isRequired }
