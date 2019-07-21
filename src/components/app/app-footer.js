import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { useSession } from '@/store/session'
import { Footer } from 'rbx'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query uiSettings {
    uiTemplate {
      _id
      pageCopyright
      pageFooterTitle
    }
  }
`

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
export const AppFooter = () => {
  const { session } = useSession()
  const { version = 'N/A' } = session

  const { data } = useQuery(UI_QUERY, { fetchPolicy: 'cache-and-network' })
  const pageCopyright = get(data, 'uiTemplate.pageCopyright', '')
  const pageFooterTitle = get(data, 'uiTemplate.pageFooterTitle', '')

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
