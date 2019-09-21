import React from 'react'
import PropTypes from 'prop-types'
import { Column } from 'rbx'
import styled from 'styled-components'

const StyledColumnGroup = styled.div`
  margin-left: 0;
  margin-right: 0;
  border-bottom: 1px solid #ccc;
`

/**
 * UiListItem splits the page into 3/5 for the label of the list item and 2/5 for the value. Any child may be passed into the value.
 */
export const UiListItem = ({ label, children }) => (
  <Column.Group as={StyledColumnGroup}>
    <Column size="two-fifths">{label}</Column>
    <Column>{children}</Column>
  </Column.Group>
)
UiListItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any
}
