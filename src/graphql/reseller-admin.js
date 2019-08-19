import gql from 'graphql-tag'
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
  const query = useQuery(RESELLER_ADMIN_LIST_QUERY, {
    variables: { resellerId }
  })
  return { ...query, data: query.data && query.data.resellerAdmins }
}

export const useResellerAdmin = userId => {
  const query = useQuery(RESELLER_ADMIN_SHOW_QUERY, {
    variables: { userId }
  })
  return { ...query, data: query.data && query.data.resellerAdmin }
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
