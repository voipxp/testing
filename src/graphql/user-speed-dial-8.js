import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USER_SERVICES_ASSIGNED_QUERY } from '.'

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

export const useUserSpeedDial8 = userId => {
  const { data, loading, error } = useQuery(USER_SPEED_DIAL_8_QUERY, {
    variables: { userId }
  })
  const result = get(data, 'userSpeedDial8')
  return { data: result, loading, error }
}

export const useUserSpeedDial8Bulk = (serviceProviderId, groupId) => {
  const { data, loading, error } = useQuery(USER_SPEED_DIAL_8_BULK_QUERY, {
    variables: { serviceProviderId, groupId }
  })
  const result = get(data, 'userSpeedDial8Bulk')
  return { data: result, loading, error }
}

export const useUserSpeedDial8Update = userId => {
  return useMutation(USER_SPEED_DIAL_8_MUTATION, {
    refetchQueries: [
      { query: USER_SERVICES_ASSIGNED_QUERY, variables: { userId } }
    ]
  })
}

export const useUserSpeedDial8BulkUpdate = (serviceProviderId, groupId) => {
  return useMutation(USER_SPEED_DIAL_8_BULK_MUTATION)
}
