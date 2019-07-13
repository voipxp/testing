import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tag, Button, Input, Icon, Column, Field, Control, Help } from 'rbx'
import { UiPolyRightArrow, UiRightArrow } from '@/components/ui'
import { CreateAutoAttendantOptions } from './create-auto-attendant-options'
import { saveAction } from '@/store/auto-attendant'

export const CreateAutoAttendantActions = props => {
  const dispatch = useReduxDispatch()
  const state = useReduxState()

  const [showActionMenu, setShowActionMenu] = React.useState(false)
  const [showActionTag, setShowActionTag] = React.useState(false)
  const [showActionTagValue, setShowActionTagValue] = React.useState('')
  const [showOptions, setShowOptions] = React.useState(false)
  const [showAddActionButton, setShowAddActionButton] = React.useState(true)

  React.useEffect(() => {
    if (document.querySelector('#actionInput') !== null) {
      document.querySelector('#actionInput').focus()
    }
  }, [showActionMenu])

  const selectValue = e => {
    if (e.key === 'Enter') {
      setActionTag(e.target.value)
      setShowActionMenu(false)
      dispatch(
        saveAction({ action: e.target.value, digit: props.digitPressed })
      )
    }
  }

  const setActionMenuVisible = () => {
    setShowActionMenu(true)
  }

  const setActionTag = value => {
    setShowActionTag(true)
    setShowActionTagValue(value)
  }

  const add = () => {
    setShowOptions(true)
    setShowAddActionButton(false)
  }

  const optionSelect = () => {
    props.optionSelect()
  }

  const findValue = () => {
    const latestMenuArray = state.autoAttendant.digits.filter(
      digit => digit.menu === state.autoAttendant.latestMenu
    )
    const value = latestMenuArray.findIndex(
      digit =>
        digit.menu === state.autoAttendant.latestMenu &&
        digit.digit === props.digitPressed
    )
    return value
  }

  return (
    <Column.Group>
      <Column size={2}>
        <UiPolyRightArrow arrowNumber={findValue()} />
      </Column>

      <Column narrow>
        {showActionTag ? <Tag color="link">{showActionTagValue}</Tag> : null}
        <Field kind="group">
          <Control expanded>
            <Button
              rounded
              outlined
              color="link"
              onClick={setActionMenuVisible}
            >
              {props.digitPressed}
            </Button>
          </Control>

          <Control>
            {showActionMenu ? (
              <>
                <Input
                  id="actionInput"
                  rounded
                  size="small"
                  type="text"
                  color="link"
                  state="focused"
                  placeholder="Enter a value"
                  onKeyPress={selectValue}
                />
                <Help color="info" size="small">
                  Press Enter after giving the value of Action
                </Help>
              </>
            ) : null}
          </Control>
        </Field>
      </Column>

      {showActionTag ? (
        <>
          <Column narrow>
            <UiRightArrow />
          </Column>
          {showAddActionButton ? (
            <Column narrow>
              <Button rounded size="large" onClick={add}>
                <Icon size="large">
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
              </Button>
            </Column>
          ) : null}
        </>
      ) : null}

      {showOptions ? (
        <CreateAutoAttendantOptions
          optionSelect={optionSelect}
          digitPressed={props.digitPressed}
        />
      ) : null}
    </Column.Group>
  )
}

CreateAutoAttendantActions.propTypes = {
  digitPressed: PropTypes.string,
  optionSelect: PropTypes.func
}
