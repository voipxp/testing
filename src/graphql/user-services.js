import gql from 'graphql-tag'

export const USER_SERVICES_FRAGMENT = gql`
  fragment UserServicesFragment on UserServices {
    _id
    userId
    userServices {
      serviceName
      assigned
    }
    servicePacks {
      servicePackName
      description
      assigned
    }
  }
`

export const USER_SERVICES_QUERY = gql`
  query userServices($userId: String!) {
    userServices(userId: $userId) {
      ...UserServicesFragment
    }
    ${USER_SERVICES_FRAGMENT}
  }
`
