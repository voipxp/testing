import angular from 'angular'
import {
  GROUP_LIST_QUERY,
  GROUP_QUERY,
  GROUP_CREATE_MUTATION,
  GROUP_UPDATE_MUTATION,
  GROUP_DELETE_MUTATION
} from '@/graphql'

angular.module('odin.api').factory('GroupService', GroupService)

GroupService.$inject = ['GraphQL']
function GroupService(GraphQL) {
  var service = { index, store, show, update, destroy }

  return service

  function index(serviceProviderId) {
    return GraphQL.query({
      query: GROUP_LIST_QUERY,
      variables: { serviceProviderId }
    }).then(res => res.data.groups)
  }

  function store(_serviceProviderId, group) {
    const { serviceProviderId, groupId } = group
    return GraphQL.mutate({
      mutation: GROUP_CREATE_MUTATION,
      variables: { input: group },
      refetchQueries: [{ query: GROUP_LIST_QUERY, variables: { serviceProviderId, groupId } }]
    }).then(res => res.data.groupCreate)
  }

  function show(serviceProviderId, groupId) {
    return GraphQL.query({
      query: GROUP_QUERY,
      variables: { serviceProviderId, groupId }
    }).then(res => res.data.group)
  }

  function update(_serviceProviderId, group) {
    const { serviceProviderId, groupId } = group
    return GraphQL.mutate({
      mutation: GROUP_UPDATE_MUTATION,
      variables: { input: group },
      refetchQueries: [{ query: GROUP_LIST_QUERY, variables: { serviceProviderId, groupId } }]
    }).then(res => res.data.groupUpdate)
  }

  function destroy(serviceProviderId, groupId) {
    return GraphQL.mutate({
      mutation: GROUP_DELETE_MUTATION,
      variables: { serviceProviderId, groupId },
      refetchQueries: [{ query: GROUP_LIST_QUERY, variables: { serviceProviderId, groupId } }],
      update: cache => {
        // seems we need to manually delete this
        cache.data.delete(`GroupList:${serviceProviderId}:${groupId}`)
      }
    }).then(res => res.data.groupDelete)
  }
}
