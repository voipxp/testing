import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { useUserServices } from '@/store/user-services'
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

  const { loadUserServices } = useUserServices(userId)

  React.useEffect(() => {
    setLoading(true)
    Promise.all([loadUserServices(userId)]).then(() => setLoading(false))
  }, [loadUserServices, userId])

  // filter items we should not see
  const menu = React.useMemo(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.version && !hasVersion(item.version)) return false
        if (item.acl && !hasLevel(item.acl)) return false
        if (item.services && !item.services.find(s => hasUserService(s))) {
          return false
        }
        if (item.module && !hasModuleRead(item.module)) return false
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
