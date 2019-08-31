import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'rbx'
import styled from 'styled-components'

const StyledSection = styled.div`
  margin-bottom: 2.5rem;
  .title {
    margin-bottom: 1rem;
  }
`

/**
 * UiSection wraps the children and adds a little margin below it. An optional **title** property can be included to add a title to the section.
 *
 * It is meant to wrap sections of content together.
 */
export const UiSection = ({ title, children }) => (
  <StyledSection>
    {title && <Title size={5}>{title}</Title>}
    {children}
  </StyledSection>
)

UiSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}
