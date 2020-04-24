import React, { useEffect } from 'react'
import { Menu, Column } from 'rbx'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { UiCheckbox } from '@/components/ui'
const StyledMenu = styled.div`
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 1rem;
`

export const BulkWizMenu = ({
  menu,
  initialData = {},
  handleWizData,
  setMenu,
  wizardComplete,
  whenTaskIsCompleted,  disableNextItem = false
}) => {
  useEffect(() => {
    handleMenuItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (item, index) => {
    if (!item.isDisabled) {
      handleMenuItems(index)
    }
  }

  const handleMenuItems = (index = 0) => {
    const newMenus = menu.map((item, j) => {
      if (disableNextItem) {
        if (j > index) item.isDisabled = true
        else item.isDisabled = false
      }

      item.active = false
      return item
    })

    if (menu[index]) menu[index]['active'] = true
    else menu[menu.length - 1]['active'] = true

    setMenu(newMenus)
  }

  const setToNext = () => {
    let activeIndex = 0
    menu.map((item, j) => {
      if (item.active) activeIndex = j
      return item
    })
    handleMenuItems(++activeIndex)
  }
  const prepareMenuData = () => {
    let currentItem
    menu.forEach((item, i) => {
      if (item.active) {
        currentItem = item
        return
      }
    })
    return menuData(currentItem)
  }

  const menuData = currentItem => {
    return (
      <>
        {currentItem ? (
          <currentItem.component
            initialData={initialData}
            handleWizData={handleWizData}
            setToNext={setToNext}
            complete={wizardComplete}
			      whenTaskIsCompleted={whenTaskIsCompleted}
            {...currentItem}
          />
        ) : (
          ''
        )}
      </>
    )
  }

  const prepareMenu = section => {
    return (
      <Menu.List>
        {menu.map((item, index) => {
          return (
            <Menu.List.Item
              key={item.name + index}
              active={item.active}
              disable="true"
              className={cx({ disabled: item.isDisabled && disableNextItem })}
              onClick={() => handleClick(item, index)}
            >
			        { item.completed ? <UiCheckbox isChecked={true} /> : null }&nbsp;
              {item.name}
            </Menu.List.Item>
          )
        })}
      </Menu.List>
    )
  }

  return (
    <>
      <Column.Group>
        <Column narrow>
          <Menu as={StyledMenu}>
            <React.Fragment>{prepareMenu()}</React.Fragment>
          </Menu>
        </Column>
        <Column style={{ overflow: 'auto' }}>{prepareMenuData()}</Column>
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
  initialData: PropTypes.object,
  handleWizData: PropTypes.func,
  setMenu: PropTypes.func,
  wizardComplete: PropTypes.func,
  disableNextItem: PropTypes.bool,
  whenTaskIsCompleted: PropTypes.func
}
