import gql from 'graphql-tag'
import { useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

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

export const RESELLER_ADMIN_SHOW_QUERY = gql`
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
      _id
      userId
    }
  }
`

export const useResellerAdmins = resellerId => {
  const { data, loading, error } = useQuery(RESELLER_ADMIN_LIST_QUERY, {
    variables: { resellerId }
  })
  return { data: data && data.resellerAdmins, loading, error }
}

export const useResellerAdmin = userId => {
  const { data, loading, error } = useQuery(RESELLER_ADMIN_SHOW_QUERY, {
    variables: { userId }
  })
  return { data: data && data.resellerAdmin, loading, error }
}

export const useResellerAdminCreate = resellerId => {
  const [exec, results] = useMutation(RESELLER_ADMIN_CREATE_MUTATION, {
    refetchQueries: [{ query: RESELLER_ADMIN_LIST_QUERY, variables: { resellerId } }]
  })
  return [input => exec({ variables: { input } }), results]
}

export const useResellerAdminUpdate = () => {
  const [exec, results] = useMutation(RESELLER_ADMIN_UPDATE_MUTATION)
  return [input => exec({ variables: { input } }), results]
}

export const useResellerAdminDelete = resellerId => {
  const [exec, results] = useMutation(RESELLER_ADMIN_DELETE_MUTATION, {
    refetchQueries: [{ query: RESELLER_ADMIN_LIST_QUERY, variables: { resellerId } }]
  })
  return [userId => exec({ variables: { userId } }), results]
}
