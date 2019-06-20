import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { Box, Control, Button, Menu, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { saveMenu } from '@/store/auto-attendant'

export const CreateAutoAttendantMenu = props => {
  const dispatch = useReduxDispatch()

  const [openMenuBox, setMenuBox] = React.useState(false)
  const [openMenu, setMenu] = React.useState(false)
  const [openAnouncements, setAnouncements] = React.useState(false)
  const [openSchedule, setSchedule] = React.useState(false)

  const add = e => {
    e.preventDefault()
    setMenuBox(true)
  }

  const openMenuSubMenu = e => {
    e.preventDefault()
    setAnouncements(false)
    setSchedule(false)
    setMenu(true)
  }

  const openAnouncementsSubMenu = e => {
    e.preventDefault()
    setMenu(false)
    setSchedule(false)
    setAnouncements(true)
  }

  const openScheduleSubMenu = e => {
    e.preventDefault()
    setMenu(false)
    setAnouncements(false)
    setSchedule(true)
  }

  const openKeys = e => {
    e.preventDefault()
    dispatch(saveMenu(e.target.textContent))
    props.setDownArrow(true)
    props.setMenuValue(e.target.textContent)
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
            <Menu.List>
              <Menu.List.Item
                onClick={openMenuSubMenu}
                active={openMenu}
                menu={
                  openMenu ? (
                    <Menu.List onClick={openKeys}>
                      <Menu.List.Item>Business Hour</Menu.List.Item>
                      <Menu.List.Item>After Office</Menu.List.Item>
                      <Menu.List.Item>Holiday Hour</Menu.List.Item>
                      <Menu.List.Item>Sub Menu</Menu.List.Item>
                    </Menu.List>
                  ) : null
                }
              >
                Menu
              </Menu.List.Item>
            </Menu.List>
            <Menu.List>
              <Menu.List.Item
                onClick={openAnouncementsSubMenu}
                active={openAnouncements}
                menu={
                  openAnouncements ? (
                    <Menu.List>
                      <Menu.List.Item>Announcement1</Menu.List.Item>
                      <Menu.List.Item>Announcement2</Menu.List.Item>
                      <Menu.List.Item>Announcement3</Menu.List.Item>
                    </Menu.List>
                  ) : null
                }
              >
                Announcements
              </Menu.List.Item>
            </Menu.List>
            <Menu.List>
              <Menu.List.Item
                onClick={openScheduleSubMenu}
                active={openSchedule}
                menu={
                  openSchedule ? (
                    <Menu.List>
                      <Menu.List.Item>Schedule1</Menu.List.Item>
                      <Menu.List.Item>Schedule2</Menu.List.Item>
                      <Menu.List.Item>Schedule3</Menu.List.Item>
                    </Menu.List>
                  ) : null
                }
              >
                Schedule
              </Menu.List.Item>
            </Menu.List>
          </Menu>
        </Box>
      ) : null}
    </>
  )
}

CreateAutoAttendantMenu.propTypes = {
  setDownArrow: PropTypes.func,
  setMenuValue: PropTypes.func
}
