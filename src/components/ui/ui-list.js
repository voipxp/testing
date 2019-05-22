import React from 'react'
import PropTypes from 'prop-types'
import { Column, Title } from 'rbx'
import styled from 'styled-components'

const StyledList = styled.div`
  margin-bottom: 2.5rem;
  .title {
    margin-bottom: 1.5rem;
  }
`

export const UiList = ({ title, children }) => (
  <StyledList>
    {title && <Title size={5}>{title}</Title>}
    {children}
  </StyledList>
)
UiList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}

const StyledColumnGroup = styled.div`
  margin-left: 0;
  margin-right: 0;
  border-bottom: 1px solid #ccc;
`

export const UiListItem = ({ label, children }) => (
  <Column.Group as={StyledColumnGroup}>
    <Column size="three-fifths">{label}</Column>
    <Column>{children}</Column>
  </Column.Group>
)
UiListItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any
}
