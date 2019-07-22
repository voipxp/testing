import React from 'react'
import styled from 'styled-components'
import { Section } from 'rbx'
import { AngularComponent } from '@/components/angular-component'
import { UiLoadingPage } from '@/components/ui'
import { useSession } from '@/graphql'
import {
  UI_APPLICATIONS_FRAGMENT,
  UI_MODULES_FRAGMENT,
  UI_SETTINGS_FRAGMENT,
  UI_TEMPLATE_FRAGMENT
} from '@/graphql'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import {
  AppAlerts,
  AppFooter,
  AppLoadingModal,
  AppLogin,
  AppNavbar,
  AppRoutes
} from '@/components/app'

const UI_QUERY = gql`
  query uiSettings {
    uiApplications {
      ...UiApplicationsFragment
    }
    uiModules {
      ...UiModulesFragment
    }
    uiSettings {
      ...UiSettingsFragment
    }
    uiTemplate {
      ...UiTemplateFragment
    }
  }
  ${UI_APPLICATIONS_FRAGMENT}
  ${UI_MODULES_FRAGMENT}
  ${UI_SETTINGS_FRAGMENT}
  ${UI_TEMPLATE_FRAGMENT}
`

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
`
export const App = () => {
  const [sessionLoaded, setSessionLoaded] = React.useState(false)
  const { session, sessionRefresh } = useSession()
  const { loading: loadingUi } = useQuery(UI_QUERY, {
    fetchPolicy: 'network-only'
  })

  React.useEffect(() => {
    sessionRefresh()
      .then(() => setSessionLoaded(true))
      .catch(() => setSessionLoaded(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!sessionLoaded || loadingUi) return <UiLoadingPage />

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
