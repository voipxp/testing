import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './department-dashboard-menu'
import { useGroupServices } from '@/store/group-services'
import groupServicesApi from '@/api/group-services'
import { useAsync } from 'react-async-hook'
 import {
	useGroupServicePermissions, 
  useAcl
} from '@/utils'
  
export const DepartmentDashboard = ({ match }) => {
  const [loading, setLoading] = React.useState(false)
  
  const { hasVersion, hasLevel } = useAcl()
  const { serviceProviderId, groupId  } = match.params
  const { loadGroupServices } = useGroupServices(groupId, serviceProviderId)
  const { hasGroupService } = useGroupServicePermissions(groupId)

 // const { result, error, execute } = useAsync(
    // () => groupServicesApi.available(groupId, serviceProviderId),
    // [groupId, serviceProviderId]
  // )

  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      loadGroupServices(groupId, serviceProviderId),
    ]).then(() => 	setLoading(false) )
  }, [useGroupServices])


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
		if (item.hasUserService && !hasGroupService(item.hasUserService)) {
          return false
        }
		
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasGroupService, hasVersion])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

DepartmentDashboard.propTypes = { match: PropTypes.object.isRequired }