import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

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

export const useResellers = () => {
  const query = useQuery(RESELLER_LIST_QUERY)
  return { ...query, data: query.data && query.data.reseller }
}

export const useReseller = resellerId => {
  const query = useQuery(RESELLER_QUERY, { variables: { resellerId } })
  return { ...query, data: query.data && query.data.reseller }
}

export const useResellerUpdate = () => {
  return useMutation(RESELLER_UPDATE_MUTATION)
}

export const useResellerDelete = () => {
  return useMutation(RESELLER_DELETE_MUTATION, {
    refetchQueries: [{ query: RESELLER_LIST_QUERY }]
  })
}
