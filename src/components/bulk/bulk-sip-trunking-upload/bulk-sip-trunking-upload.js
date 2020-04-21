import React from 'react'
import { menu } from './bulk-sip-trunking-upload-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk/bulk-wiz-menu'
import { Redirect } from 'react-router-dom'
import { AppBreadcrumb } from '@/components/app'
import { Breadcrumb } from 'rbx'

export const BulkSipTrunkingUpload = () => {

   const [menuTemp, setMenuTemp] = React.useState( [...menu] )
   const [redirect, setRedirect] = React.useState(false)

   const handleSetMenu = (menuData) => {
       setMenuTemp(menuData)
   }

   const wizardComplete = () => {
     setRedirect(true)
   }

   const whenTaskIsCompleted = (task, isCompleted=true) => {
    const tempMenu = menuTemp.map(menu => {
      if(task === menu.name) menu.completed = isCompleted
      return menu
    })
    setMenuTemp([...tempMenu])
   }

   return <>
     { redirect ? <Redirect to='/bulk' /> : null}
     <AppBreadcrumb>
      <Breadcrumb.Item href="#!/bulk">Bulk</Breadcrumb.Item>
      <Breadcrumb.Item>SIP Trunking Upload</Breadcrumb.Item>
    </AppBreadcrumb>
     <BulkWizMenu
       menu={menuTemp}
       setMenu={(menuData) => handleSetMenu(menuData)}
       wizardComplete={wizardComplete}
       whenTaskIsCompleted={whenTaskIsCompleted}
     />
   </>
}
