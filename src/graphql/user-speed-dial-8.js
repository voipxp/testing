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
  mutation UserSpeedDial8Update($input: UserSpeedDial8Input) {
    userSpeedDial8Update(input: $input) {
      ...UserSpeedDial8Fragment
    }
  }
  ${USER_SPEED_DIAL_8_FRAGMENT}
`

export const useUserSpeedDial8 = userId => {
  const { data, loading, error } = useQuery(USER_SPEED_DIAL_8_QUERY, {
    variables: { userId }
  })
  const result = get(data, 'userSpeedDial8')
  return { data: result, loading, error }
}

export const useUserSpeedDial8Update = userId => {
  return useMutation(USER_SPEED_DIAL_8_MUTATION, {
    refetchQueries: [
      {
        query: USER_SERVICES_ASSIGNED_QUERY,
        variables: { userId }
      }
    ]
  })
}
