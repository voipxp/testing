import React from 'react'
import styled from 'styled-components'
import { useSession } from '@/store/session'
import { useReduxState } from 'reactive-react-redux'
import { Footer } from 'rbx'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
export const AppFooter = () => {
  const { session } = useSession()
  const state = useReduxState()
  const { version = 'N/A' } = session
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
