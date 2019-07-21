import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Section } from 'rbx'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useSession } from '@/store/session'
import {
  AppAlerts,
  AppFooter,
  AppLoadingModal,
  AppLogin,
  AppNavbar,
  AppRoutes
} from '@/components/app'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const UI_QUERY = gql`
  query uiSettings {
    uiApplications {
      _id
      description
      name
      partner
      url
      window
    }
    uiModules {
      _id
      alias
      description
      groupCreate
      groupDelete
      groupRead
      groupUpdate
      name
      provisioningCreate
      provisioningDelete
      provisioningRead
      provisioningUpdate
      serviceProviderCreate
      serviceProviderDelete
      serviceProviderRead
      serviceProviderUpdate
      url
      userCreate
      userDelete
      userRead
      userUpdate
    }
    uiSettings {
      _id
      editCLID
      sessionTimeout
    }
    uiTemplate {
      _id
      pageCopyright
      pageFooterTitle
      pageGoogleUA
      pageLoginMessage
      pageTitle
      styleCustomCss
      styleMenuColor
    }
  }
`

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
export const App = ({ initialized }) => {
  const { session } = useSession()
  const { data } = useQuery(UI_QUERY, { fetchPolicy: 'network-only' })

  if (!initialized || !data) return <UiLoadingPage />

  return (
    <>
      <AppAlerts />
      {session.userId ? (
        <>
          <Wrapper>
            <AppNavbar />
            <Section>
              <AppRoutes />
            </Section>
          </Wrapper>
          <AppFooter />
        </>
      ) : (
        <AppLogin />
      )}
      <AngularComponent component="pbsConfirmModal" />
      <AppLoadingModal />
    </>
  )
}

App.propTypes = {
  initialized: PropTypes.bool
}
