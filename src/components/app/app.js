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

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
export const App = ({ initialized }) => {
  const { session } = useSession()

  if (!initialized) return <UiLoadingPage />

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
      <AppLoadingModal />
      <AngularComponent component="pbsConfirmModal" />
    </>
  )
}

App.propTypes = {
  initialized: PropTypes.bool
}
