import gql from 'graphql-tag'

export const USER_SERVICE_INSTANCE_FRAGMENT = gql`
  fragment UserServiceInstanceFragment on UserServiceInstance {
    _id
    userId
    groupId
    serviceProviderId
    serviceType
    name
    phoneNumber
    extension
    resellerId
  }
`
export const USER_SERVICE_INSTANCES_QUERY = gql`
  query userServiceInstances(
    $serviceProviderId: String
    $serviceType: String
    $groupId: SearchCriteria
    $userId: SearchCriteria
    $name: SearchCriteria
    $phoneNumber: SearchCriteria
    $extension: SearchCriteria
    $resellerId: SearchCriteria
  ) {
    userServiceInstances(
      serviceProviderId: $serviceProviderId
      serviceType: $serviceType
      groupId: $groupId
      userId: $userId
      name: $name
      phoneNumber: $phoneNumber
      extension: $extension
      resellerId: $resellerId
    ) {
      ...UserServiceInstanceFragment
    }
  }
  ${USER_SERVICE_INSTANCE_FRAGMENT}
`

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

export const USER_SERVICES_UPDATE_MUTATION = gql`
  mutation userServicesUpdate($input: UserServicesInput!) {
    userServicesUpdate(input: $input) {
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
