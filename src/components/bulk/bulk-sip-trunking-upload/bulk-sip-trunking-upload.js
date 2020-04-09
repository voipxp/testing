import React, { useEffect } from 'react'
import { menu } from './bulk-sip-trunking-upload-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk/bulk-wiz-menu'
import { Redirect } from 'react-router-dom'

export const BulkSipTrunkingUpload = () => {

  // const [initialState, setInitialState] = React.useState({...initial})
   const [menuTemp, setMenuTemp] = React.useState( [...menu] )
   const [prepareData, setPrepareData] = React.useState([])
   const [redirect, setRedirect] = React.useState(false)

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
       //initialData={sipTrunkShareableData}
      //  handleWizData={handleWizData}
       setMenu={(menuData) => handleSetMenu(menuData)}
       wizardComplete={wizardComplete}
     />
   </>
}
