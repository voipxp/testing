import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RRule } from 'rrule'

const Wrapper = styled.span`
  position: relative;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`
const Options = [
  { label: 'Daily', value: RRule.DAILY },
  { label: 'Weekly', value: RRule.WEEKLY },
  { label: 'Monthly', value: RRule.MONTHLY },
  { label: 'Yearly', value: RRule.YEARLY }
]

const label = {}
label[RRule.DAILY] = 'Days'
label[RRule.WEEKLY] = 'Weeks'
label[RRule.MONTHLY] = 'Months'
label[RRule.YEARLY] = 'Years'

export const UiRruleSelect = ({ rrule, startTime }) => <Wrapper />

UiRruleSelect.propTypes = {
  rrule: PropTypes.object.isRequired,
  startTime: PropTypes.string.isRequired
}
