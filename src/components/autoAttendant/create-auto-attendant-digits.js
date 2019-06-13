import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch, useReduxState } from 'reactive-react-redux'
import { Column, Field } from 'rbx'
import { CreateAutoAttendantActions } from './create-auto-attendant-actions'
import { UiNumpad } from '@/components/ui'
import { saveDigits } from '@/store/auto-attendant'

export const CreateAutoAttendantDigits = props => {
  const state = useReduxState()
  const dispatch = useReduxDispatch()

  const [showDigits, setShowDigits] = React.useState(false)

  const buttonSelect = e => {
    e.preventDefault()
    setShowDigits(true)
    dispatch(saveDigits(e.target.textContent))
  }

  const optionSelect = () => {
    props.optionSelect()
  }

  const autoAttendantActions = digit => (
    <Field horizontal key={`${state.autoAttendant.latestMenu}_${digit.digit}`}>
      <CreateAutoAttendantActions
        digitPressed={digit.digit}
        optionSelect={optionSelect}
      />
    </Field>
  )

  return (
    <>
      <Column.Group>
        <Column>
          <Column.Group breakpoint="mobile">
            <Column>
              <UiNumpad buttonSelect={buttonSelect} />
            </Column>
          </Column.Group>
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
      </Column.Group>
    </>
  )
}

CreateAutoAttendantDigits.propTypes = {
  optionSelect: PropTypes.func
}
