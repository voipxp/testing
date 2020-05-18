import React, { useEffect } from 'react'
import { menu } from './bulk-sip-trunking-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk'
import { StorageService } from '@/utils'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

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

export const BulkSipTrunkingBase = ({ history }) => {
  const [sipTrunkShareableData, setSipTrunkShareableData] = React.useState({
    ...initial
  })
  const [menuTemp, setMenuTemp] = React.useState([...menu])
  const [redirect, setRedirect] = React.useState(false)

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
    setRedirect(true)
  }

  return (
    <>
      {redirect ? history.goBack() : null}
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
  history: PropTypes.object
}

export const BulkSipTrunking = withRouter(BulkSipTrunkingBase)
