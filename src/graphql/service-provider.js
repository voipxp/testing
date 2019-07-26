import gql from 'graphql-tag'

export const SERVICE_PROVIDER_LIST_FRAGMENT = gql`
  fragment ServiceProviderListFragment on ServiceProviderList {
    serviceProviderId
    serviceProviderName
    isEnterprise
  }
`

export const SERVICE_PROVIDER_SHOW_FRAGMENT = gql`
  fragment ServiceProviderShowFragment on ServiceProvider {
    serviceProviderId
    serviceProviderName
    isEnterprise
    defaultDomain
    supportEmail
    useCustomRoutingProfile
    useServiceProviderLanguages
    contact {
      contactName
      contactNumber
      contactEmail
    }
    address {
      addressLine1
      addressLine2
      city
      stateOrProvince
      stateOrProvinceDisplayName
      zipOrPostalCode
      country
    }
  }
`
