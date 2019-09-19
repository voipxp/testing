import gql from 'graphql-tag'

export const RESELLER_FRAGMENT = gql`
  fragment ResellerFragment on Reseller {
    _id
    resellerId
    resellerName
  }
`

export const RESELLER_LIST_QUERY = gql`
    query resellers {
      resellers {
        ...ResellerFragment
      }
      ${RESELLER_FRAGMENT}
    }
  `

export const RESELLER_QUERY = gql`
    query reseller($resellerId: String!) {
      reseller(resellerId: $resellerId) {
        ...ResellerFragment
      }
      ${RESELLER_FRAGMENT}
    }
  `

export const RESELLER_CREATE_MUTATION = gql`
  mutation resellerCreate($input: ResellerInput!) {
    resellerCreate(input: $input) {
      ...ResellerFragment
    }
    ${RESELLER_FRAGMENT}
  }
`

export const RESELLER_UPDATE_MUTATION = gql`
    mutation resellerUpdate($input: ResellerInput!) {
      resellerUpdate(input: $input) {
        ...ResellerFragment
      }
      ${RESELLER_FRAGMENT}
    }
  `

export const RESELLER_DELETE_MUTATION = gql`
  mutation resellerDelete($resellerId: String!) {
    resellerDelete(resellerId: $resellerId) {
      _id
      resellerId
    }
  }
`
