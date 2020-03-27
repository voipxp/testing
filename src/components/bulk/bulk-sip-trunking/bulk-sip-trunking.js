import React, { useEffect } from 'react'
import { menu } from './bulk-sip-trunking-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk'
import { Redirect } from 'react-router-dom'
// import { BulkImportService } from '@/components/bulk/service/bulk-import-service'

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
 // const [initialState, setInitialState] = React.useState({...initial})
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
      // return <Redirect to='/' />
      //console.log('Task is all done.')
    // prepareImportData().then((data) => {
    //     setPrepareData(data)
    // })
  }

// const prepareImportData = () => {
//   return Promise.all(prepareImport()).then( (data) => {
//     return data
//   })
// }

  // const prepareImport = () => {

  //     const tasks = []
  //     sipTrunkShareableData.users.forEach(function(el, i) {
  //       const task = {
  //         task: 'bulk.sip.trunking',
  //         serviceProviderId: sipTrunkShareableData.serviceProviderId || null,
  //         groupId: sipTrunkShareableData.groupId || null,
  //         userId: el.userId || null,
  //         groupTrunk: sipTrunkShareableData.groupTrunk || null,
  //         endpointType: sipTrunkShareableData.endpointType || null,
  //         linePort: sipTrunkShareableData.linePort || null,
  //       }
  //       task['isPilot'] = 'false'
  //       tasks.push(task)
  //     })

  //     return tasks
  // }

	return <>
    { redirect ? <Redirect to='/bulk' /> : null}
    <BulkWizMenu
      menu={menuTemp}
      initialData={sipTrunkShareableData}
      handleWizData={handleWizData}
      setMenu={(menuData) => handleSetMenu(menuData)}
      wizardComplete={wizardComplete}
    />
  </>
}
