import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './department-dashboard-menu'
 import {
   
  useAcl
} from '@/utils'
  
export const DepartmentDashboard = ({ match }) => {
  const [loading, setLoading] = React.useState(true)
  
  const { hasVersion, hasLevel } = useAcl()
 
/*
  const { loadUserAssignedServices } = useUserAssignedServices(userId)
  const { loadUserViewableServices } = useUserViewableServices(userId)
  const { loadUserServices } = useUserServices(userId)
  const { loadUser } = useUser(userId)*/

 /* React.useEffect(() => {
    setLoading(true)
    Promise.all([
      loadUserAssignedServices(userId),
      loadUserViewableServices(userId),
      loadUserServices(userId),
      loadUser(userId)
    ]).then(() => setLoading(false))
  }, [
    loadUser,
    loadUserAssignedServices,
    loadUserServices,
    loadUserViewableServices,
    userId
  ]) */

  // filter items we should not see
  const menu = React.useMemo(() => {
	  setLoading(false)
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.hasVersion && !hasVersion(item.hasVersion)) {
          return false
        }
        if (item.hasLevel && !hasLevel(item.hasLevel)) {
          return false
        }
        
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasVersion])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

DepartmentDashboard.propTypes = { match: PropTypes.object.isRequired }