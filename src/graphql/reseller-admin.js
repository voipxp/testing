import gql from 'graphql-tag'

export const RESELLER_ADMIN_FRAGMENT = gql`
  fragment ResellerAdminFragment on ResellerAdmin {
    _id
    resellerId
    userId
    lastName
    firstName
    language
  }
`

export const RESELLER_ADMIN_LIST_QUERY = gql`
    query resellerAdmins($resellerId:String!) {
      resellerAdmins(resellerId:$resellerId) {
        ...ResellerAdminFragment
      }
      ${RESELLER_ADMIN_FRAGMENT}
    }
  `

export const RESELLER_ADMIN_QUERY = gql`
    query resellerAdmin($userId: String!) {
      resellerAdmin(userId: $userId) {
        ...ResellerAdminFragment
      }
      ${RESELLER_ADMIN_FRAGMENT}
    }
  `

export const RESELLER_ADMIN_CREATE_MUTATION = gql`
  mutation resellerAdminCreate($input: ResellerAdminCreateInput!) {
    resellerAdminCreate(input: $input) {
      ...ResellerAdminFragment
    }
    ${RESELLER_ADMIN_FRAGMENT}
  }
`

export const RESELLER_ADMIN_UPDATE_MUTATION = gql`
    mutation resellerAdminUpdate($input: ResellerAdminUpdateInput!) {
      resellerAdminUpdate(input: $input) {
        ...ResellerAdminFragment
      }
      ${RESELLER_ADMIN_FRAGMENT}
    }
  `

export const RESELLER_ADMIN_DELETE_MUTATION = gql`
  mutation resellerAdminDelete($userId: String!) {
    resellerAdminDelete(userId: $userId) {
      ...ResellerAdminFragment
    }
    ${RESELLER_ADMIN_FRAGMENT}
  }
`
