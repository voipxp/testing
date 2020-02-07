import React, { useEffect } from 'react'
import { menu } from './clone-enterprise-dashboard-menu'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import BulkWizMenu from '../bulk-wiz-menu'

import {
  UiLoadingCard,
  UiMenu,
  UiCard,
  UiButton,
  UiCardModal,
  UiCheckbox,
  UiInputCheckbox,
  UiSection,
  UiListItem,
  UiFormField
} from '@/components/ui'

export const CloneEnterpriseBulk = () => {

  const [menuTemp, setMenuTemp] = React.useState( [...menu] )

  useEffect( () => {
    disableMenuItems()
    console.log(menuTemp)
  }, [])

  const disableMenuItems = () => {
      const newMenuTemp = menuTemp.map( (item, j) => {
        if( !item.active || item.active === 'false') {
          item.isDisabled = true
        }
        return item
      })

    setMenuTemp(newMenuTemp)
  }

  const setToNext = (KeyIndex) => {
      const newMenuTemp = menuTemp.map( (item, j) => {
        if( j === KeyIndex + 1) item.active = true
        else item.active = false
        return item
      })

    setMenuTemp(newMenuTemp)
  }

	return <>
    <BulkWizMenu
      menu={menuTemp}
      next={setToNext}
    />

  </>
}
