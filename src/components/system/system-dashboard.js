import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { dashboardMenu } from './system-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'
import styled from 'styled-components'
const StyledBreadcrumb = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
export const SystemDashboard = ({ history }) => { 
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const { hasModuleRead } = useModulePermissions()
  const acl = useAcl()
  const hasReseller = acl.hasReseller()
  const camelCasedTxt =  window.location.href.split("/").pop().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
  const firstUpercaseLetters = camelCasedTxt.replace(/([A-Z])/g, ' $1').trim()
  const breadcrumbNewItem = firstUpercaseLetters.charAt(0).toUpperCase() + firstUpercaseLetters.slice(1)
  
  //if(service.path ==='branding') history.push(`/${service.path}`)
  //else history.push(`${match.url}/${match.path}`)
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
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasModuleRead, hasVersion, isLevel, isPaasAdmin])

  return (
   <>
      <Breadcrumb as={StyledBreadcrumb}>
        <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>
		    { hasReseller && (
          <>
            <Breadcrumb.Item href={`${window.location.href}`}>
            {breadcrumbNewItem}
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb>
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

SystemDashboard.propTypes = {
  history : PropTypes.object
}
