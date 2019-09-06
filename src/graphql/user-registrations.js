import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

export const USER_REGISTRATION_FRAGMENT = gql`
  fragment UserRegistrationsFragment on UserRegistrations {
    _id
    userId
    registrations {
      accessInfo
      deviceLevel
      deviceName
      endpointType
      expiration
      featureParameters
      linePort
      lockoutCount
      lockoutExpires
      lockoutStarted
      order
      pathHeader
      privateIdentity
      privateNetAddress
      privatePort
      publicNetAddress
      publicPort
      sipInstanceId
      supportsOnlyCsMedia
      supportsVoiceOverPs
      uri
      userAgent
    }
  }
`

export const USER_REGISTRATIONS_QUERY = gql`
  query userRegistrations($userId: String!) {
    userRegistrations(userId: $userId) {
      ...UserRegistrationsFragment
    }
    ${USER_REGISTRATION_FRAGMENT}
  }
`

export const useUserRegistrations = userId => {
  const query = useQuery(USER_REGISTRATIONS_QUERY, { variables: { userId } })
  return { ...query, data: query.data && query.data.userRegistrations }
}
