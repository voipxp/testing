import React from 'react'
import PropTypes from 'prop-types'
import { UiMenu, UiLoadingCard } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { useUserServicePermissions, useModulePermissions, useAcl } from '@/utils'
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
        if (item.hasVersion && !Acl.hasVersion(item.hasVersion)) {
          return false
        }
        if (item.hasLevel && !Acl.hasLevel(item.hasLevel)) {
          return false
        }
        if (item.hasUserService && !Permissions.hasUserService(item.hasUserService)) {
          return false
        }
        if (item.hasRead && !Module.hasRead(item.hasRead)) return false
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [Acl, Module, Permissions])

  return (
    <>
      <AppBreadcrumb />
      {Permissions.loading || Module.loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

UserDashboard.propTypes = { match: PropTypes.object.isRequired }
