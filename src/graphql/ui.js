import gql from 'graphql-tag'

export const UI_APPLICATIONS_FRAGMENT = gql`
  fragment UiApplicationsFragment on BrandingApplication {
    _id
    description
    name
    partner
    url
    window
  }
`

export const UI_SETTINGS_FRAGMENT = gql`
  fragment UiSettingsFragment on BrandingSettings {
    _id
    editCLID
    sessionTimeout
  }
`

export const UI_TEMPLATE_FRAGMENT = gql`
  fragment UiTemplateFragment on BrandingTemplate {
    _id
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
`
