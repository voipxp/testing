import React from 'react'
import { Breadcrumb, Message } from 'rbx'
import styled from 'styled-components'

const BreadcrumbStyled = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
const NotFound = () => (
  <>
    <Breadcrumb as={BreadcrumbStyled}>
      <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>Error</Breadcrumb.Item>
    </Breadcrumb>

    <Message color="dark">
      <Message.Body>
        We are sorry, but the page you requested was not found.
      </Message.Body>
    </Message>
  </>
)

export default NotFound
