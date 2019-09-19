import gql from 'graphql-tag'

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
