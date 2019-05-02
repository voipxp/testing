import React from 'react'
import PropTypes from 'prop-types'
import { AppBreadcrumb } from '@/components/app'
import { useReduxDispatch } from 'reactive-react-redux'
import { useAcl } from '@/utils/acl'
import { UiMenu, UiLoadingCard } from '@/components/ui'
import dashboardMenu from './user-dashboard-menu'
import { loadUserViewableServices } from '@/store/user-viewable-services'
import { loadUserAssignedServices } from '@/store/user-assigned-services'
import { useUserServicePermissions } from '@/utils/user-services'
import { useModulePermissions } from '@/utils/module'
import { loadUser } from '@/store/user'

const UserDashboard = ({ match }) => {
  const dispatch = useReduxDispatch()
  const [menu, setMenu] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const { userId } = match.params
  const { hasVersion, hasLevel } = useAcl()
  const { hasUserService } = useUserServicePermissions(userId)
  const { hasModuleRead } = useModulePermissions()

  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      dispatch(loadUserAssignedServices(userId)),
      dispatch(loadUserViewableServices(userId)),
      dispatch(loadUser(userId))
    ]).then(() => setLoading(false))
  }, [dispatch, userId])

  // filter items we should not see
  React.useEffect(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.version && !hasVersion(item.version)) return false
        if (item.acl && !hasLevel(item.acl)) return false
        if (item.service && !hasUserService(item.service)) return false
        if (item.module && !hasModuleRead(item.module)) return false
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    setMenu(filteredMenu)
  }, [hasLevel, hasModuleRead, hasUserService, hasVersion])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

UserDashboard.propTypes = { match: PropTypes.object.isRequired }

export default UserDashboard
