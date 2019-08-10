import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

export const USER_SERVICES_ASSIGNED_FRAGMENT = gql`
  fragment UserServicesAssignedFragment on UserServicesAssigned {
    _id
    userId
    userServices {
      serviceName
      isActive
    }
    groupServices {
      serviceName
      isActive
    }
  }
`

export const USER_SERVICES_VIEWABLE_FRAGMENT = gql`
  fragment UserServicesViewableFragment on UserServicesViewable {
    _id
    userId
    userServices {
      serviceName
    }
  }
`

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

export const USER_SERVICES_ASSIGNED_QUERY = gql`
  query userServicesAssigned($userId: String!) {
    userServicesAssigned(userId: $userId) {
      ...UserServicesAssignedFragment
    }
    ${USER_SERVICES_ASSIGNED_FRAGMENT}
  }
`

export const USER_SERVICES_VIEWABLE_QUERY = gql`
  query userServicesViewable($userId: String!) {
    userServicesViewable(userId: $userId) {
      ...UserServicesViewableFragment
    }
    ${USER_SERVICES_VIEWABLE_FRAGMENT}
  }
`

export const USER_SERVICES_ASSIGNED_AND_VIEWABLE_QUERY = gql`
  query userServicesAssignedAndViewable($userId: String!) {
    userServicesAssigned(userId: $userId) {
      ...UserServicesAssignedFragment
    }
    userServicesViewable(userId: $userId) {
      ...UserServicesViewableFragment
    }
    ${USER_SERVICES_ASSIGNED_FRAGMENT}
    ${USER_SERVICES_VIEWABLE_FRAGMENT}
  }
`

export const useUserServicesAssignedAndViewable = userId => {
  const { data, loading, error } = useQuery(
    USER_SERVICES_ASSIGNED_AND_VIEWABLE_QUERY,
    {
      variables: { userId }
    }
  )
  const assigned = get(data, 'userServicesAssigned', { userServices: [] })
  const viewable = get(data, 'userServicesViewable', { userServices: [] })
  return { assigned, viewable, loading, error }
}

export const useUserServices = userId => {
  const { data, loading, error } = useQuery(USER_SERVICES_QUERY, {
    variables: { userId }
  })
  const userServices = get(data, 'userServices', { userServices: [] })
  const servicePacks = get(data, 'userServices', { servicePacks: [] })
  return { userServices, servicePacks, loading, error }
}
