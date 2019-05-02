import React from 'react'
import { useReduxState } from 'reactive-react-redux'
import { Footer } from 'rbx'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
const AppFooter = () => {
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

export default AppFooter
