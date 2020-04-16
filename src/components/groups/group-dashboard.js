import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './group-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'


export const GroupDashboard = ({ match }) => {
  const [loading, setLoading] = React.useState(false)
  const { hasVersion, hasLevel, isLevel } = useAcl()
  const { hasModuleRead } = useModulePermissions()
 
  // filter items we should not see
  const menu = React.useMemo(() => { 
    //setLoading(true)
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.hasVersion && !hasVersion(item.hasVersion)) {
          return false
        }
        if (item.hasLevel && !hasLevel(item.hasLevel)) {
          return false
        }
        if (item.isLevel && !isLevel(item.isLevel)) {
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
  }, [hasLevel, hasModuleRead, hasVersion, isLevel])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
    
  )
 }
GroupDashboard.propTypes = { match: PropTypes.object.isRequired }
