import gql from 'graphql-tag'

export const ANNOUNCEMENT_SELECTIONS = {
  DEFAULT: 'Default',
  PERSONAL: 'Personal'
}

export const STREET_ADDRESS_FRAGMENT = gql`
  fragment StreetAddressFragment on StreetAddress {
    addressLine1
    addressLine2
    city
    country
    stateOrProvince
    stateOrProvinceDisplayName
    zipOrPostalCode
  }
`
export const CONTACT_FRAGMENT = gql`
  fragment ContactFragment on Contact {
    contactEmail
    contactName
    contactNumber
  }
`

export const ACCESS_DEVICE_FRAGMENT = gql`
  fragment AccessDeviceFragment on AccessDevice {
    deviceLevel
    deviceName
  }
`
export const ACCESS_DEVICE_ENDPOINT_FRAGMENT = gql`
  fragment AccessDeviceEndpointFragment on AccessDeviceEndpoint {
    accessDevice {
      ...AccessDeviceFragment
    }
    contacts {
      ...ContactFragment
    }
    linePort
    portNumber
    privateIdentity
    staticRegistrationCapable
    supportVisualDeviceManagement
    useDomain
  }
  ${ACCESS_DEVICE_FRAGMENT}
  ${CONTACT_FRAGMENT}
`

export const TRUNK_GROUP_DEVICE_ENDPOINT_FRAGMENT = gql`
  fragment TrunkGroupDeviceEndpointFragment on TrunkGroupDeviceEndpoint {
    contacts
    isPilotUser
    linePort
    name
    staticRegistrationCapable
    useDomain
  }
`

export const TRUNK_ADDRESSING_FRAGMENT = gql`
  fragment TrunkAddressingFragment on TrunkAddressing {
    alternateTrunkIdentity
    alternateTrunkIdentityDomain
    enterpriseTrunkName
    trunkGroupDeviceEndpoint {
      ...TrunkGroupDeviceEndpointFragment
    }
    ${TRUNK_GROUP_DEVICE_ENDPOINT_FRAGMENT}
  }
`
