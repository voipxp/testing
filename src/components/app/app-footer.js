import React from 'react'
import styled from 'styled-components'
import { useSession } from '@/store/session'
import { useUiTemplate } from '@/store/ui-template'
import { Footer } from 'rbx'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
export const AppFooter = () => {
  const { session } = useSession()
  const { version = 'N/A', softwareVersion = 'x', loginType } = session
  const { template } = useUiTemplate()
  const {
    pageCopyright = 'Park Bench Solutins Inc.',
    pageFooterTitle = 'odin Web'
  } = template

  return (
    <Footer as={StyledFooter} textAlign="centered">
      <p>
        <strong>{pageFooterTitle}</strong>&nbsp;
        <span>&copy; {pageCopyright}</span>&nbsp;
        <small style={{ float: 'left' }}>{loginType}</small>
        <small>({version})</small>
        <small style={{ float: 'right' }}>v{softwareVersion}</small>
      </p>
    </Footer>
  )
}
