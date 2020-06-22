import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { Breadcrumb } from 'rbx'
import { dashboardMenu } from './system-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'
import { UrlOperations } from '@/utils'
import { AppBreadcrumb } from '@/components/app'
import _ from 'lodash'

export const SystemDashboard = ({ match, history }) => {
  const { hasVersion, hasLevel, isLevel, isPaasAdmin } = useAcl()
  const { hasModuleRead } = useModulePermissions()
  const [navigation, setNavigation] = React.useState([])

  const params = new URLSearchParams(history.location.search)
  const navigate = params.get('navigate')
  const breadcrumbs =
    UrlOperations.getBreadcrumbItems(match.url, history.location.pathname) || []
  const loading = false

  React.useEffect(() => {
    /*  If we found  'navigate' in search params then breadcrumb will be
        same and 'navigate' will be added to next to the older breadcrumb.
        e.g. 'old breadcrumb / navigate'
    */
    if (!_.isEqual(navigation, breadcrumbs)) {
      if (!navigate) setNavigation(breadcrumbs)
    }
  }, [breadcrumbs, navigation, navigate])

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
      <AppBreadcrumb>
        {navigation.map(el => (
          <Breadcrumb.Item href={el.href} key={el.label}>
            {el.label}
          </Breadcrumb.Item>
        ))}
        {navigate && <Breadcrumb.Item>{navigate}</Breadcrumb.Item>}
      </AppBreadcrumb>
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

SystemDashboard.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}
