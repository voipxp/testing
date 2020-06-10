import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { UrlOperations } from '@/utils'
import { dashboardMenu } from './service-provider-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'

export const ServiceProviderDashboard = ({ match, history }) => {
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const { hasModuleRead } = useModulePermissions()
  const breadcrumbs =
    UrlOperations.getBreadcrumbItems(match.url, history.location.pathname) || []
  const loading = false

  const menu = React.useMemo(() => {
    const filterItems = item => {
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
    }

    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = []
      section.items.forEach(item => {
        if (filterItems(item)) {
          if (item.subMenus) {
            item.subMenus = item.subMenus.filter(subMenuTtem =>
              filterItems(subMenuTtem)
            )
          }
          items.push(item)
        }
        // else if(filterItems(item)) items.push(item)
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasModuleRead, hasVersion, isLevel, isPaasAdmin])

  return (
    <>
      <AppBreadcrumb>
        {breadcrumbs.map(el => (
          <Breadcrumb.Item href={el.href} key={el.label}>
            {el.label}
          </Breadcrumb.Item>
        ))}
      </AppBreadcrumb>
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

ServiceProviderDashboard.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}
