import React, { useEffect } from 'react'
import { menu } from './bulk-sip-trunking-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk'
import { Redirect } from 'react-router-dom'

const initial = {
  serviceProviderId: "",
  groupId: "",
  sourceServiceProviderId: "",
  sourceGroupId: "",
  enterpriseTrunkName: "",
  groupTrunk: "",
  phoneNumbers:[],
  users:[]
}

export const BulkSipTrunking = () => {
  const [sipTrunkShareableData, setSipTrunkShareableData] = React.useState({...initial})
  const [menuTemp, setMenuTemp] = React.useState( [...menu] )
  const [prepareData, setPrepareData] = React.useState([])
  const [redirect, setRedirect] = React.useState(false)

  const handleWizData = (data) => {
    setSipTrunkShareableData(data)
  }

  useEffect( () => {
    setPrepareData([])
  }, [sipTrunkShareableData])

  const handleSetMenu = (menuData) => {
      setMenuTemp(menuData)
  }

  const wizardComplete = () => {
    setRedirect(true)
  }

	return <>
    { redirect ? <Redirect to='/bulk' /> : null}
    <BulkWizMenu
      menu={menuTemp}
      initialData={sipTrunkShareableData}
      handleWizData={handleWizData}
      setMenu={(menuData) => handleSetMenu(menuData)}
      wizardComplete={wizardComplete}
      disableNextItem={true}
    />
  </>
}
