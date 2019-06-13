import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tag, Button, Control, Input, Icon } from 'rbx'
import { UiPolyArrow, UiRightArrow } from '@/components/ui'
import { CreateAutoAttendantOptions } from './create-auto-attendant-options'
import { saveAction } from '@/store/auto-attendant'

export const CreateAutoAttendantActions = props => {
  const dispatch = useReduxDispatch()

  const [showActionMenu, setShowActionMenu] = React.useState(false)
  const [showActionTag, setShowActionTag] = React.useState(false)
  const [showActionTagValue, setShowActionTagValue] = React.useState('')
  const [showOptions, setShowOptions] = React.useState(false)
  const [showAddActionButton, setShowAddActionButton] = React.useState(true)

  const selectValue = e => {
    e.preventDefault()
    setActionTag(e.target.value)
    setShowActionMenu(false)
    dispatch(saveAction({ action: e.target.value, digit: props.digitPressed }))
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
  }

  const optionSelect = () => {
    setShowAddActionButton(false)
    props.optionSelect()
  }

  return (
    <>
      <Control>
        {/* <UiPolyArrow />*/}
        <UiRightArrow />
      </Control>

      <Control>
        {showActionTag ? <Tag size="normal">{showActionTagValue}</Tag> : null}
        <Button rounded outlined color="link" onClick={setActionMenuVisible}>
          {props.digitPressed}
        </Button>
      </Control>

      {showActionMenu ? (
        <Control>
          <Input
            rounded
            size="small"
            type="text"
            color="link"
            placeholder="Enter Action"
            onBlur={selectValue}
          />
        </Control>
      ) : null}

      {showActionTag ? (
        <>
          <Control>
            <UiRightArrow />
          </Control>
          {showAddActionButton ? (
            <Control>
              <Button rounded size="large" onClick={add}>
                <Icon size="large">
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
              </Button>
            </Control>
          ) : null}
        </>
      ) : null}

      {showOptions ? (
        <CreateAutoAttendantOptions
          optionSelect={optionSelect}
          digitPressed={props.digitPressed}
        />
      ) : null}
    </>
  )
}

CreateAutoAttendantActions.propTypes = {
  digitPressed: PropTypes.string,
  optionSelect: PropTypes.func
}
