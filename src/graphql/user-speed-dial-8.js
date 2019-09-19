import gql from 'graphql-tag'

export const USER_SPEED_DIAL_8_FRAGMENT = gql`
  fragment UserSpeedDial8Fragment on UserSpeedDial8 {
    _id
    userId
    speedCodes {
      description
      phoneNumber
      speedCode
    }
    user {
      _id
      lastName
      firstName
    }
  }
`

export const USER_SPEED_DIAL_8_QUERY = gql`
  query UserSpeedDial8($userId: String!) {
    userSpeedDial8(userId: $userId) {
      ...UserSpeedDial8Fragment
    }
    ${USER_SPEED_DIAL_8_FRAGMENT}
  }
`

export const USER_SPEED_DIAL_8_MUTATION = gql`
  mutation UserSpeedDial8Update($input: UserSpeedDial8Input!) {
    userSpeedDial8Update(input: $input) {
      ...UserSpeedDial8Fragment
    }
  }
  ${USER_SPEED_DIAL_8_FRAGMENT}
`

export const USER_SPEED_DIAL_8_BULK_FRAGMENT = gql`
fragment UserSpeedDial8BulkFragment on UserSpeedDial8Bulk {
  users {
    ...UserSpeedDial8Fragment
  }
  ${USER_SPEED_DIAL_8_FRAGMENT}
}
`

export const USER_SPEED_DIAL_8_BULK_QUERY = gql`
  query UserSpeedDial8Bulk($serviceProviderId: String!, $groupId: String!) {
    userSpeedDial8Bulk(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      ...UserSpeedDial8BulkFragment
    }
    ${USER_SPEED_DIAL_8_BULK_FRAGMENT}
  }
`

export const USER_SPEED_DIAL_8_BULK_MUTATION = gql`
  mutation UserSpeedDial8BulkUpdate($input: UserSpeedDial8BulkInput!) {
    userSpeedDial8BulkUpdate(input: $input) {
      ...UserSpeedDial8BulkFragment
    }
  }
  ${USER_SPEED_DIAL_8_BULK_FRAGMENT}
`
