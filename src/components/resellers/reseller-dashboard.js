import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './reseller-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'

export const ResellerDashboard = ({ match }) => {
  // const { resellerId } = match.params

  const { hasVersion, hasLevel } = useAcl()
  const { hasModuleRead } = useModulePermissions()

  const loading = false

  const menu = React.useMemo(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.version && !hasVersion(item.version)) return false
        if (item.acl && !hasLevel(item.acl)) return false
        if (item.module && !hasModuleRead(item.module)) return false
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [hasLevel, hasModuleRead, hasVersion])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

ResellerDashboard.propTypes = { match: PropTypes.object.isRequired }
