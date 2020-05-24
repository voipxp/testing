import React, { useEffect } from 'react'
import { menu } from './bulk-sip-trunking-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk'
import { StorageService } from '@/utils'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { UrlOperations } from '@/utils'

const initial = {
  serviceProviderId: '',
  groupId: '',
  sourceServiceProviderId: '',
  sourceGroupId: '',
  enterpriseTrunkName: '',
  groupTrunk: '',
  phoneNumbers: [],
  users: []
}

export const BulkSipTrunkingBase = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search)
  const [sipTrunkShareableData, setSipTrunkShareableData] = React.useState({
    ...initial
  })
  const [menuTemp, setMenuTemp] = React.useState([...menu])

  const handleWizData = data => {
    setSipTrunkShareableData(data)
  }

  useEffect(() => {
    menuTemp.forEach(item => {
      StorageService.clearStorage(item.localStorageKey)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetMenu = menuData => {
    setMenuTemp(menuData)
  }

  const wizardComplete = () => {
    history.push(
      UrlOperations.modifyLastDirectoryPartOfUrl(searchParams.get('returnTo'), 'recent-tasks')
    )
  }

  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item onClick={() => history.goBack()}>Bulk</Breadcrumb.Item>
        <Breadcrumb.Item>SIP Trunking</Breadcrumb.Item>
      </AppBreadcrumb>

      <BulkWizMenu
        menu={menuTemp}
        initialData={sipTrunkShareableData}
        handleWizData={handleWizData}
        setMenu={menuData => handleSetMenu(menuData)}
        wizardComplete={wizardComplete}
        disableNextItem={true}
      />
    </>
  )
}

BulkSipTrunkingBase.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
}

export const BulkSipTrunking = withRouter(BulkSipTrunkingBase)
