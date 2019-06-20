import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Tag, Button, Input, Icon, Column } from 'rbx'
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
    setShowAddActionButton(false)
  }

  const optionSelect = () => {
    props.optionSelect()
  }

  return (
    <Column.Group vcentered centered>
      <Column narrow />
      <Column narrow />
      <Column narrow />
      <Column>
        <UiRightArrow />
      </Column>

      <Column>
        {showActionTag ? (
          <Tag color="link" size="normal">
            {showActionTagValue}
          </Tag>
        ) : null}
        <Button rounded outlined color="link" onClick={setActionMenuVisible}>
          {props.digitPressed}
        </Button>

        {showActionMenu ? (
          <Input
            rounded
            size="small"
            type="text"
            color="link"
            placeholder="Enter Action"
            onBlur={selectValue}
          />
        ) : null}
      </Column>

      {showActionTag ? (
        <>
          <Column>
            <UiRightArrow />
          </Column>
          {showAddActionButton ? (
            <Column>
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
