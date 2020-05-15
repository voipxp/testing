import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { dashboardMenu } from './group-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'
export const GroupDashboard = ({ match }) => {
  const [loading] = React.useState(false)
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const { hasModuleRead } = useModulePermissions()

  const camelCasedTxt =  window.location.href.split("/").pop().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
  const firstUpercaseLetters = camelCasedTxt.replace(/([A-Z])/g, ' $1').trim()
  const breadcrumbNewItem = firstUpercaseLetters.charAt(0).toUpperCase() + firstUpercaseLetters.slice(1)
 // filter items we should not see

  const menu = React.useMemo(() => {
    const filterItems = (item) => {
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
        if(filterItems(item)) {
          if (item.subMenus) {
            item.subMenus = item.subMenus.filter( subMenuTtem => filterItems(subMenuTtem))
          }
          items.push(item)
        }
        // else if(filterItems(item)) items.push(item)
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
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
 }
GroupDashboard.propTypes = {
   match: PropTypes.object.isRequired
  }
