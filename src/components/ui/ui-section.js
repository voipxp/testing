import React from 'react'
import PropTypes from 'prop-types'
import { Title } from 'rbx'
import styled from 'styled-components'

const StyledSection = styled.div`
  margin-left: -0.5rem;
  margin-bottom: 2.5rem;
  .title {
    margin-bottom: 1rem;
  }
  .section-content {
    margin-left: 0.5rem;
  }
`

export const UiSection = ({ title, children }) => (
  <StyledSection>
    {title && <Title size={5}>{title}</Title>}
    <div className="section-content">{children}</div>
  </StyledSection>
)

UiSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
}
