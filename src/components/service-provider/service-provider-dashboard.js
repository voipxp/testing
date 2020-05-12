import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './service-provider-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils' 

  export const ServiceProviderDashboard = ({ match }) => {
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const { hasModuleRead } = useModulePermissions()
  const camelCasedTxt =  window.location.href.split("/").pop().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
  const firstUpercaseLetters = camelCasedTxt.replace(/([A-Z])/g, ' $1').trim()
  const breadcrumbNewItem = firstUpercaseLetters.charAt(0).toUpperCase() + firstUpercaseLetters.slice(1)
    
  const loading = false

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
        if (item.isLevel && !isLevel(item.isLevel)) {
          return false
        }
        if (item.isPaasAdmin && !isPaasAdmin()) {
          return false
        }
        if (item.hasModuleRead && !hasModuleRead(item.hasModuleRead)) {
          return false
        }
        return true
      })
      
      if (items.length > 0) filteredMenu.push({ label: section.label, items})
    })
    return filteredMenu
  }, [hasLevel, hasModuleRead, hasVersion, isLevel, isPaasAdmin ])
  
  return (
   <>
      <AppBreadcrumb>
        <Breadcrumb.Item> {breadcrumbNewItem}</Breadcrumb.Item>
      </AppBreadcrumb> 
      {loading ? <UiLoadingCard /> : <UiMenu menu={ menu} />}
    </>
  )
} 

ServiceProviderDashboard.propTypes = { 
  match: PropTypes.object.isRequired
}
