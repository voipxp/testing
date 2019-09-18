import gql from 'graphql-tag'

export const UI_APPLICATIONS_FRAGMENT = gql`
  fragment UiApplicationsFragment on BrandingApplication {
    id
    description
    name
    partner
    url
    window
  }
`

export const UI_SETTINGS_FRAGMENT = gql`
  fragment UiSettingsFragment on BrandingSettings {
    id
    editCLID
    sessionTimeout
  }
`

export const UI_TEMPLATE_FRAGMENT = gql`
  fragment UiTemplateFragment on BrandingTemplate {
    id
    pageCopyright
    pageFooterTitle
    pageGoogleUA
    pageLoginMessage
    pageTitle
    styleCustomCss
    styleMenuColor
  }
`

export const UI_MODULES_FRAGMENT = gql`
  fragment UiModulesFragment on BrandingModule {
    id
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
`

export const UI_MODULES_QUERY = gql`
  query uiModules {
    uiModules {
      ...UiModulesFragment
    }
    ${UI_MODULES_FRAGMENT}
  }
`

export const UI_QUERY = gql`
  query uiQuery {
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
