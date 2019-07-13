import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { Column } from 'rbx'
import { UiNumpad } from '@/components/ui'
import { saveDigits } from '@/store/auto-attendant'

export const CreateAutoAttendantDigits = props => {
  const dispatch = useReduxDispatch()

  const buttonSelect = e => {
    e.preventDefault()
    if (e.target.textContent !== '1234567890*#') {
      props.setShowDigits(true)
      dispatch(saveDigits(e.target.textContent))
    }
  }

  return (
    <>
      <Column narrow />
      <Column offset={1} size={2}>
        <UiNumpad buttonSelect={buttonSelect} />
      </Column>
    </>
  )
}

CreateAutoAttendantDigits.propTypes = {
  setShowDigits: PropTypes.func
}
