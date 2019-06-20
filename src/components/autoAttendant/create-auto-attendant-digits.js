import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { Column } from 'rbx'
import { CreateAutoAttendantActions } from './create-auto-attendant-actions'
import { UiNumpad } from '@/components/ui'
import { saveDigits } from '@/store/auto-attendant'

export const CreateAutoAttendantDigits = props => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const [showDigits, setShowDigits] = React.useState(false)

  const buttonSelect = e => {
    e.preventDefault()
    if (e.target.textContent !== '1234567890*#') {
      setShowDigits(true)
      dispatch(saveDigits(e.target.textContent))
    }
  }

  const optionSelect = () => {
    props.optionSelect()
  }

  const autoAttendantActions = digit => (
    <CreateAutoAttendantActions
      key={`${state.autoAttendant.latestMenu}_${digit.digit}`}
      digitPressed={digit.digit}
      optionSelect={optionSelect}
    />
  )

  return (
    <>
      <Column offset={1} size={2}>
        <UiNumpad buttonSelect={buttonSelect} />
      </Column>

      <Column>
        {showDigits
          ? Array.isArray(state.autoAttendant.digits)
            ? state.autoAttendant.digits.map(digit =>
                digit.menu === state.autoAttendant.latestMenu
                  ? autoAttendantActions(digit)
                  : null
              )
            : autoAttendantActions(state.autoAttendant.digits.digit)
          : null}
      </Column>
    </>
  )
}

CreateAutoAttendantDigits.propTypes = {
  optionSelect: PropTypes.func
}
