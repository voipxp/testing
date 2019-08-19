import React from 'react'
import PropTypes from 'prop-types'
import { UiLoadingCard, UiMenu } from '@/components/ui'
import { AppBreadcrumb } from '@/components/app'
import { dashboardMenu } from './reseller-dashboard-menu'
import { useModulePermissions, useAcl } from '@/utils'

export const ResellerDashboard = ({ match }) => {
  // const { resellerId } = match.params

  const Acl = useAcl()
  const Module = useModulePermissions()

  const loading = false

  const menu = React.useMemo(() => {
    const filteredMenu = []
    dashboardMenu.forEach(section => {
      const items = section.items.filter(item => {
        if (item.hasVersion && !Acl.hasVersion(item.hasVersion)) {
          return false
        }
        if (item.hasLevel && !Acl.hasLevel(item.hasLevel)) {
          return false
        }
        if (item.isLevel && !Acl.isLevel(item.isLevel)) {
          return false
        }
        if (item.isPaasAdmin && !Acl.isPaasAdmin()) {
          return false
        }
        if (item.hasRead && !Module.hasRead(item.hasRead)) {
          return false
        }
        return true
      })
      if (items.length > 0) filteredMenu.push({ label: section.label, items })
    })
    return filteredMenu
  }, [Acl, Module])

  return (
    <>
      <AppBreadcrumb />
      {loading ? <UiLoadingCard /> : <UiMenu menu={menu} />}
    </>
  )
}

ResellerDashboard.propTypes = { match: PropTypes.object.isRequired }
