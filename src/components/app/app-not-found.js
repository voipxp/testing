import React from 'react'
import styled from 'styled-components'
import { Breadcrumb, Message } from 'rbx'

const BreadcrumbStyled = styled.div`
  margin-top: -2rem;
  margin-bottom: 1rem;
`
export const AppNotFound = () => (
  <>
    <Breadcrumb as={BreadcrumbStyled}>
      <Breadcrumb.Item href="#!/">Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>Error</Breadcrumb.Item>
    </Breadcrumb>

    <Message color="dark">
      <Message.Body>We are sorry, but the page you requested was not found.</Message.Body>
    </Message>
  </>
)
