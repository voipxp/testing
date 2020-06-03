import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { Section } from 'rbx'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useUi } from '@/store/ui'
import { useSession } from '@/store/session'
import {
  AppAlerts,
  AppFooter,
  AppForgotPassword,
  AppLoadingModal,
  AppLogin,
  AppNavbar,
  AppNewPassword,
  AppRoutes,
  AppResetPassword
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
        <Switch>
          {/* This is change password */}
          <Route path='/resetPassword' component={AppResetPassword}/>
          {/* This is part of forget password */}
          <Route path='/passwordreset/:email/:token' component={AppNewPassword}/>
          {/* This is part of forget password */}
          <Route path='/forgotPassword' component={AppForgotPassword}/>
          {/* Go To Login Page */}
          <Route path='/' component={AppLogin}/>
        </Switch>
      )}
      <AngularComponent component="pbsConfirmModal" />
      <AppLoadingModal />
    </>
  )
}
