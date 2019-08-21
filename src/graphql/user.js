import gql from 'graphql-tag'
import {
  ACCESS_DEVICE_ENDPOINT_FRAGMENT,
  STREET_ADDRESS_FRAGMENT,
  TRUNK_ADDRESSING_FRAGMENT
} from './common'

export const USER_LIST_FRAGMENT = gql`
  fragment UserListFragment on UserList {
    _id
    countryCode
    department
    emailAddress
    extension
    firstName
    groupId
    lastName
    nationalPrefix
    phoneNumber
    phoneNumberActivated
    serviceProviderId
    userId
  }
`

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    accessDeviceEndpoint {
      ...AccessDeviceEndpointFragment
    }
    address {
      ...StreetAddressFragment
    }
    addressLocation
    aliases
    alternateUserIds
    callingLineIdFirstName
    callingLineIdLastName
    callingLineIdPhoneNumber
    countryCode
    defaultAlias
    department
    departmentFullPath
    emailAddress
    extension
    firstName
    groupId
    hiraganaFirstName
    hiraganaLastName
    impId
    language
    lastName
    mobilePhoneNumber
    nameDialingName
    nationalExtension
    nationalPrefix
    networkClassOfService
    officeZoneName
    pagerPhoneNumber
    phoneNumber
    primaryZoneName
    serviceProviderId
    timeZone
    timeZoneDisplayName
    title
    trunkAddressing {
      ...TrunkAddressingFragment
    }
    userId
    yahooId
  }
  ${ACCESS_DEVICE_ENDPOINT_FRAGMENT}
  ${STREET_ADDRESS_FRAGMENT}
  ${TRUNK_ADDRESSING_FRAGMENT}
`

export const USER_LIST_QUERY = gql`
  query users($serviceProviderId: String!, $groupId: String!, $includeUser: Boolean!) {
    users(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      ...UserListFragment
      user @include(if: $includeUser) {
        callingLineIdPhoneNumber
      }
    }
    ${USER_LIST_FRAGMENT}
  }
`

export const USER_QUERY = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      ...UserFragment
    }
    ${USER_FRAGMENT}
  }
`

export const USER_CREATE_MUTATION = gql`
  mutation userCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
