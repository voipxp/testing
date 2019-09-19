import gql from 'graphql-tag'

import {
  ACCESS_DEVICE_ENDPOINT_FRAGMENT,
  STREET_ADDRESS_FRAGMENT,
  TRUNK_ADDRESSING_FRAGMENT
} from './common'

export const ALTERNATE_USER_ID_FRAGMENT = gql`
  fragment AlternateUserIdFragment on AlternateUserId {
    alternateUserId
    description
  }
`

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
    userId
    serviceProviderId
    groupId
    lastName
    firstName
    callingLineIdLastName
    callingLineIdFirstName
    nameDialingName
    hiraganaLastName
    hiraganaFirstName
    phoneNumber
    extension
    callingLineIdPhoneNumber
    department {
      serviceProviderId
      groupId
      name
    }
    departmentFullPath
    language
    timeZone
    timeZoneDisplayName
    defaultAlias
    aliases
    endpointType
    accessDeviceEndpoint {
      ...AccessDeviceEndpointFragment
    }
    trunkAddressing {
      ...TrunkAddressingFragment
    }
    title
    pagerPhoneNumber
    mobilePhoneNumber
    emailAddress
    yahooId
    addressLocation
    address {
      ...StreetAddressFragment
    }
    countryCode
    nationalPrefix
    networkClassOfService
    alternateUserIds {
      ...AlternateUserIdFragment
    }
  }
  ${ACCESS_DEVICE_ENDPOINT_FRAGMENT}
  ${STREET_ADDRESS_FRAGMENT}
  ${TRUNK_ADDRESSING_FRAGMENT}
  ${ALTERNATE_USER_ID_FRAGMENT}
`

export const USER_LIST_QUERY = gql`
  query users($serviceProviderId: String!, $groupId: String!, $includeUser: Boolean!) {
    users(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      ...UserListFragment
      user @include(if: $includeUser) {
        _id
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

export const USER_UPDATE_MUTATION = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const USER_BULK_UPDATE_MUTATION = gql`
  mutation userBulkUpdate($input: UserBulkUpdateInput!) {
    userBulkUpdate(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const USER_DELETE_MUTATION = gql`
  mutation userDelete($userId: String!) {
    userDelete(userId: $userId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
