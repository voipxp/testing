import React, {useEffect} from 'react'
import { menu } from './bulk-sip-trunking-upload-dashboard-menu'
import { BulkWizMenu } from '@/components/bulk/bulk-wiz-menu'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router'

export const BulkSipTrunkingUploadBase = ({ history }) => {
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

   useEffect(() => {
    const tempMenu = menuTemp.map(menu => {
      return {
        ...menu,
        completed: false
      }
    })
    if(!_.isEqual(tempMenu, menuTemp)) setMenuTemp([...tempMenu])
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return <>
     { redirect ? history.goBack() : null}
     <AppBreadcrumb>
        <Breadcrumb.Item onClick={() => history.goBack()}>Bulk</Breadcrumb.Item>
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

BulkSipTrunkingUploadBase.propTypes = {
  history: PropTypes.object
}

export const BulkSipTrunkingUpload = withRouter(BulkSipTrunkingUploadBase)
