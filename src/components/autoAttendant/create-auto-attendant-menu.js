import React from 'react'
import PropTypes from 'prop-types'
import { Box, Control, Button, Menu, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAutoAttendant } from '@/store/auto-attendant'

export const CreateAutoAttendantMenu = props => {
  const { autoAttendant, saveMenu } = useAutoAttendant()
  const [openMenuBox, setMenuBox] = React.useState(false)

  const add = e => {
    e.preventDefault()
    setMenuBox(true)
    props.add()
  }

  const openKeys = e => {
    e.preventDefault()
    if (
      (e.target.textContent && e.target.textContent === 'Business Hour') ||
      e.target.textContent === 'After Office' ||
      e.target.textContent === 'Holiday Hour'
    ) {
      saveMenu(e.target.textContent)
      props.setDownArrow(e.target.textContent)
      props.setMenuValue(e.target.textContent)
    }
  }

  return (
    <>
      {!openMenuBox ? (
        <Control>
          <Button rounded outlined size="large" onClick={add} color={'link'}>
            <Icon size="large">
              <FontAwesomeIcon icon={faPlus} />
            </Icon>
          </Button>
        </Control>
      ) : null}

      {openMenuBox ? (
        <Box style={{ width: '250px' }}>
          <Menu>
            <Menu.Label textColor="link" align="center">
              Select Menu
            </Menu.Label>
            <Menu.List onClick={openKeys}>
              {autoAttendant &&
              autoAttendant.menu &&
              autoAttendant.menu.includes('Business Hour') ? null : (
                <Menu.List.Item>Business Hour</Menu.List.Item>
              )}
              {autoAttendant &&
              autoAttendant.menu &&
              autoAttendant.menu.includes('After Office') ? null : (
                <Menu.List.Item>After Office</Menu.List.Item>
              )}
              {autoAttendant &&
              autoAttendant.menu &&
              autoAttendant.menu.includes('Holiday Hour') ? null : (
                <Menu.List.Item>Holiday Hour</Menu.List.Item>
              )}
              {/* <Menu.List.Item>
                <Divider color="black" />
              </Menu.List.Item>
              <Menu.List.Item>Sub Menu</Menu.List.Item>*/}
            </Menu.List>
          </Menu>
        </Box>
      ) : null}
    </>
  )
}

CreateAutoAttendantMenu.propTypes = {
  setDownArrow: PropTypes.func,
  setMenuValue: PropTypes.func,
  add: PropTypes.func
}
