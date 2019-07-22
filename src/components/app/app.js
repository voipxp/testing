import React from 'react'
import styled from 'styled-components'
import { Section } from 'rbx'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useSession, UI_QUERY } from '@/graphql'
import { useQuery } from '@apollo/react-hooks'

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
  const { session, sessionRefresh } = useSession()
  const { loading } = useQuery(UI_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: () => {}
  })

  React.useEffect(() => {
    sessionRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <UiLoadingPage />

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
