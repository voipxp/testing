import React from 'react'
import styled from 'styled-components'
import { Section } from 'rbx'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useUi } from '@/store/ui'
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
export const App = () => {
  const { session } = useSession()
  const { initialized } = useUi()

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
