import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './department-dashboard-menu'
import { useGroupServices } from '@/store/group-services'
import {
	useGroupServicePermissions,
  useAcl,
  useModulePermissions
} from '@/utils'

export const DepartmentDashboard = ({ match }) => {
  const [loading, setLoading] = React.useState(false)

  const { hasVersion, hasLevel, hasPolicy } = useAcl()
  const { serviceProviderId, groupId } = match.params
  const { loadGroupServices } = useGroupServices(groupId, serviceProviderId)
  const { hasGroupService } = useGroupServicePermissions()
  const { hasModuleRead } = useModulePermissions()

 // const { result, error, execute } = useAsync(
    // () => groupServicesApi.available(groupId, serviceProviderId),
    // [groupId, serviceProviderId]
  // )

  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      loadGroupServices(groupId, serviceProviderId),
    ]).then(() => 	setLoading(false) )
  }, [serviceProviderId, groupId, loadGroupServices])


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
	    	if (item.hasGroupService && !hasGroupService(item.hasGroupService)) {
          return false
        }
        if ( item.hasPolicy && !hasPolicy(item.hasPolicy) ) {
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
  }, [hasLevel, hasModuleRead, hasGroupService, hasVersion, hasPolicy])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

DepartmentDashboard.propTypes = { match: PropTypes.object.isRequired }
