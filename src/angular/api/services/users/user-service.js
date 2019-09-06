import angular from 'angular'
import omit from 'lodash/omit'
import {
  USER_LIST_QUERY,
  USER_CREATE_MUTATION,
  USER_DELETE_MUTATION,
  USER_UPDATE_MUTATION,
  USER_BULK_UPDATE_MUTATION,
  USER_QUERY
} from '@/graphql'
angular.module('odin.api').factory('UserService', UserService)

UserService.$inject = ['GraphQL']
function UserService(GraphQL) {
  const service = { index, store, show, update, destroy, bulk }
  return service

  function index(serviceProviderId, groupId, includeUser = false) {
    return GraphQL.query({
      query: USER_LIST_QUERY,
      variables: { serviceProviderId, groupId, includeUser }
    }).then(res => res.data.users)
  }

  function store(serviceProviderId, groupId, user) {
    return GraphQL.mutate({
      mutation: USER_CREATE_MUTATION,
      variables: { input: user },
      refreshQueries: [
        { query: USER_LIST_QUERY, variables: { serviceProviderId, groupId, includeUser: false } }
      ]
    }).then(res => res.data.userCreate)
  }

  function show(userId) {
    return GraphQL.query({
      query: USER_QUERY,
      variables: { userId }
    }).then(res => console.log(res.data.user) || res.data.user)
  }

  function update(userId, user) {
    const { serviceProviderId, groupId } = user
    return GraphQL.mutate({
      mutation: USER_UPDATE_MUTATION,
      variables: { input: user },
      refreshQueries: [
        { query: USER_LIST_QUERY, variables: { serviceProviderId, groupId, includeUser: false } }
      ]
    }).then(res => res.data.userUpdate)
  }

  function bulk({ users, data }) {
    const input = { users: users.map(({ userId }) => ({ userId, ...data })) }
    return GraphQL.mutate({
      mutation: USER_BULK_UPDATE_MUTATION,
      variables: { input }
    }).then(res => res.data.userBulkUpdate)
  }

  function destroy(userId) {
    return GraphQL.mutate({
      mutation: USER_DELETE_MUTATION,
      variables: { userId },
      update: (store, { data: { userDelete } }) => {
        const { serviceProviderId, groupId } = userDelete
        const { users } = store.readQuery({
          query: USER_LIST_QUERY,
          variables: { serviceProviderId, groupId, includeUser: false }
        })
        store.writeQuery({
          query: USER_LIST_QUERY,
          data: { users: users.filter(user => user.userId !== userId) },
          variables: { serviceProviderId, groupId, includeUser: false }
        })
      }
    }).then(res => res.data.userDelete)
  }
}
