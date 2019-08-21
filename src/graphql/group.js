import gql from 'graphql-tag'

export const GROUP_LIST_FRAGMENT = gql`
  fragment GroupListFragment on GroupList {
    _id
    groupId
    groupName
    userLimit
  }
`

export const GROUP_LIST_QUERY = gql`
  query groups($serviceProviderId: String!) {
    groups(serviceProviderId: $serviceProviderId) {
     ...GroupListFragment
    }
    ${GROUP_LIST_FRAGMENT}
  }
`

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    _id
    groupId
    groupName
    userLimit
    serviceProviderId
    defaultDomain
    callingLineIdName
    callingLineIdPhoneNumber
    callingLineIdDisplayPhoneNumber
    timeZone
    timeZoneDisplayName
    locationDialingCode
    contact {
      contactName
      contactNumber
      contactEmail
    }
    address {
      addressLine1
      addressLine2
      city
      stateOrProvince
      stateOrProvinceDisplayName
      zipOrPostalCode
      country
    }
  }
`

export const GROUP_QUERY = gql`
  query group($serviceProviderId: String!, $groupId: String!) {
    group(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      ...GroupFragment
    }
    ${GROUP_FRAGMENT}
  }
`

export const GROUP_CREATE_MUTATION = gql`
  mutation groupCreate($input: GroupCreateInput!) {
    groupCreate(input:$input) {
      ...GroupFragment
    }
    ${GROUP_FRAGMENT}
  }
`

export const GROUP_UPDATE_MUTATION = gql`
  mutation groupUpdate($input: GroupUpdateInput!) {
    groupUpdate(input:$input) {
      ...GroupFragment
    }
    ${GROUP_FRAGMENT}
  }
`

export const GROUP_DELETE_MUTATION = gql`
  mutation groupDelete($serviceProviderId: String!, $groupId: String!) {
    groupDelete(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      ...GroupFragment
    }
    ${GROUP_FRAGMENT}
  }
`
