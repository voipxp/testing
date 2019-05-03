import React from 'react'
import styled from 'styled-components'
import { useReduxState } from 'reactive-react-redux'
import { Footer } from 'rbx'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
export const AppFooter = () => {
  const state = useReduxState()
  const { version = 'N/A' } = state.session
  const {
    pageCopyright = 'Park Bench Solutins Inc.',
    pageFooterTitle = 'odin Web'
  } = state.ui.template

  return (
    <Footer as={StyledFooter} textAlign="centered">
      <p>
        <strong>{pageFooterTitle}</strong>&nbsp;
        <span>&copy; {pageCopyright}</span>&nbsp;
        <small>({version})</small>
      </p>
    </Footer>
  )
}
