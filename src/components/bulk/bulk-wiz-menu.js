import React from 'react'
// import { menu } from './clone-enterprise-dashboard-menu'
import { Menu, Column } from 'rbx'
import styled from 'styled-components'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
// import CloneEnterpriseBulkView from './clone-enterprise-bulk-view'
import PropTypes from 'prop-types'

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
import { Field, Control, Button, Input, Select, Icon } from 'rbx'

const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

const BulkWizMenu = (props) => {
  //const menu = props.menu || []
  //const menuData = props.menuData || ''
  const [menu, setMenu] = React.useState( [...props.menu] )

  const prepareMenuData = () => {
    let currentItem
    menu.forEach( (item, i) => {
      if(item.active) {
        currentItem = item
        currentItem.index = i
        return
      }
    })
    return menuData(currentItem)
  }

  const menuData = (currentItem) => {
    let isLastItem = false
    if(currentItem.index + 1 === menu.length) isLastItem = true

    return (
      <>
        <UiCard title={currentItem.name}><currentItem.component /></UiCard>
        { !isLastItem ?
          <div style={{marginTop: '20px'}}>
              { nextButton(currentItem) }
        </div>
         : ""}
      </>
    )
  }

	const prepareMenu = (section) => {
		return (
		<Menu.List>
                  {menu.map(item => {
                    //const path = `${match.url}/${item.path}`
                    return (
                      <Menu.List.Item
                        key={item.name}
                        active={item.active}
                        disable='true'
						            //onClick={() => updateWizardView(item.name)}
                        //href={`#!${path}`}
                      >
                        {item.name}
                      </Menu.List.Item>
                    )
                  })}
                </Menu.List>
		)
  }

  const setToNext = (index) => {
    const newMenu = menu.map( (item, j) => {
      if( j === index + 1) item.active = true
      else item.active = false
      return item
    })

    setMenu(newMenu)
}

  const nextButton = (current) => {
    return (
      (
        <Button style={{float: 'right'}}
          color="link"
          onClick={ () => setToNext(current.index)}
          disabled = { current.isRequired && !current.goToNext }
        >
          Next
        </Button>
      )
    )
  }

    return (
	    <>
        <Column.Group>
          <Column narrow>
            <Menu as={StyledMenu}>
                <React.Fragment>
                  { prepareMenu() }
                </React.Fragment>
            </Menu>
          </Column>
          <Column style={{ overflow: 'auto' }}>
              { prepareMenuData() }
          </Column>
        </Column.Group>
      </>
  )
}

BulkWizMenu.propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        component: PropTypes.any,
        active: PropTypes.bool
      })
    ).isRequired,
    next: PropTypes.func
}

export default BulkWizMenu
