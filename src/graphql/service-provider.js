import gql from 'graphql-tag'

export const SERVICE_PROVIDER_LIST_FRAGMENT = gql`
  fragment ServiceProviderListFragment on ServiceProviderList {
    _id
    serviceProviderId
    serviceProviderName
    isEnterprise
    resellerId
  }
`

export const SERVICE_PROVIDER_SHOW_FRAGMENT = gql`
  fragment ServiceProviderShowFragment on ServiceProvider {
    _id
    serviceProviderId
    serviceProviderName
    isEnterprise
    defaultDomain
    supportEmail
    useCustomRoutingProfile
    useServiceProviderLanguages
    resellerId
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

export const SERVICE_PROVIDER_LIST_QUERY = gql`
    query serviceProviders($resellerId: String) {
      serviceProviders(resellerId: $resellerId) {
        ...ServiceProviderListFragment
      }
      ${SERVICE_PROVIDER_LIST_FRAGMENT}
    }
  `

export const SERVICE_PROVIDER_SHOW_QUERY = gql`
    query serviceProvider($serviceProviderId: String!) {
      serviceProvider(serviceProviderId: $serviceProviderId) {
        ...ServiceProviderShowFragment
      }
      ${SERVICE_PROVIDER_SHOW_FRAGMENT}
    }
  `

export const SERVICE_PROVIDER_CREATE_MUTATION = gql`
  mutation serviceProviderCreate($input: ServiceProviderCreateInput!) {
    serviceProviderCreate(input: $input) {
      ...ServiceProviderShowFragment
    }
    ${SERVICE_PROVIDER_SHOW_FRAGMENT}
  }
`

export const SERVICE_PROVIDER_UPDATE_MUTATION = gql`
    mutation serviceProviderUpdate($input: ServiceProviderUpdateInput!) {
      serviceProviderUpdate(input: $input) {
        ...ServiceProviderShowFragment
      }
      ${SERVICE_PROVIDER_SHOW_FRAGMENT}
    }
  `

export const SERVICE_PROVIDER_DELETE_MUTATION = gql`
  mutation serviceProviderDelete($serviceProviderId: String!) {
    serviceProviderDelete(serviceProviderId: $serviceProviderId) {
      ...ServiceProviderShowFragment
    }
    ${SERVICE_PROVIDER_SHOW_FRAGMENT}
  }
`
