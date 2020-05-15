import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { useUserAssignedServices } from '@/store/user-assigned-services'
import { useUserViewableServices } from '@/store/user-viewable-services'
import { useUserServices } from '@/store/user-services'
import { useUiTemplate } from '@/store/ui-template'
import { useUser } from '@/store/user'
import {
  useUserServicePermissions,
  useModulePermissions,
  useAcl
} from '@/utils'
import { dashboardMenu } from './user-dashboard-menu'

export const UserDashboard = ({ match }) => {
  const [loading, setLoading] = React.useState(true)
  const { userId } = match.params
  const { hasVersion, hasLevel } = useAcl()
  const { hasUserService } = useUserServicePermissions(userId)
  const { hasModuleRead } = useModulePermissions()
  const { loadTemplate } = useUiTemplate()

  const { loadUserAssignedServices } = useUserAssignedServices(userId)
  const { loadUserViewableServices } = useUserViewableServices(userId)
  const { loadUserServices } = useUserServices(userId)
  const { loadUser } = useUser(userId)

  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      loadUserAssignedServices(userId),
      loadUserViewableServices(userId),
      loadUserServices(userId),
      loadUser(userId),
      loadTemplate(),
    ]).then(() => setLoading(false))
  }, [
    loadUser,
    loadUserAssignedServices,
    loadUserServices,
    loadUserViewableServices,
    userId
  ])

  // filter items we should not see
  const menu = React.useMemo(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.hasVersion && !hasVersion(item.hasVersion)) {
          return false
        }
        if (item.hasLevel && !hasLevel(item.hasLevel)) {
          return false
        }
        if (item.hasUserService && !hasUserService(item.hasUserService)) {
          return false
        }
        if (item.hasModuleRead && !hasModuleRead(item.hasModuleRead)) {
          return false
        }
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasModuleRead, hasUserService, hasVersion])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

UserDashboard.propTypes = { match: PropTypes.object.isRequired }
