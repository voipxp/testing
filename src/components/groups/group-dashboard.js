import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { dashboardMenu } from './group-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'
import styled from 'styled-components'
const StyledBreadcrumb = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`

export const GroupDashboard = ({ match }) => { 
  const {serviceProviderId, groupId} = match.params
  const [loading, setLoading] = React.useState(false)
  const { hasVersion, hasLevel, isLevel } = useAcl()
  const { hasModuleRead } = useModulePermissions()
  
  const camelCasedTxt =  window.location.href.split("/").pop().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
  const firstUpercaseLetters = camelCasedTxt.replace(/([A-Z])/g, ' $1').trim()
  const breadcrumbNewItem = firstUpercaseLetters.charAt(0).toUpperCase() + firstUpercaseLetters.slice(1)
   const acl = useAcl()
 // const hasGroup = acl.hasGroup()
  const hasServiceProvider = acl.hasServiceProvider()
  // filter items we should not see
  const menu = React.useMemo(() => { 
    setLoading(true)
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
      <Breadcrumb as={StyledBreadcrumb}>
        <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>
		{hasServiceProvider && groupId && (
        <>
          <Breadcrumb.Item
            href={`#!/serviceProviders/${serviceProviderId}/groups`}
          >
            Groups
          </Breadcrumb.Item>
          <Breadcrumb.Item href={`#!/groups/${serviceProviderId}/${groupId}`}>
            {groupId}
          </Breadcrumb.Item>
        </>
      )}
	  
          {serviceProviderId && groupId && (
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
GroupDashboard.propTypes = {
   match: PropTypes.object.isRequired
  }
