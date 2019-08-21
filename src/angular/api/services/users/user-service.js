import angular from 'angular'
import { USER_LIST_QUERY, USER_CREATE_MUTATION, USER_QUERY } from '@/graphql'
angular.module('odin.api').factory('UserService', UserService)

UserService.$inject = ['$http', 'Route', 'GraphQL']
function UserService($http, Route, GraphQL) {
  var service = {
    index,
    store,
    show,
    update,
    destroy,
    info,
    bulk
  }
  var url = Route.api('/users')

  return service

  function index(serviceProviderId, groupId, includeUser = false) {
    return GraphQL.query({
      query: USER_LIST_QUERY,
      variables: { serviceProviderId, groupId, includeUser }
    }).then(res => res.data.users)
  }

  function info(userId) {
    return $http.get(url('login'), { params: { userId } }).then(response => response.data)
  }

  function store(serviceProviderId, groupId, user) {
    return GraphQL.mutate({
      mutation: USER_CREATE_MUTATION,
      variables: { input: user },
      refreshQueries: [{ query: USER_LIST_QUERY, variables: { serviceProviderId, groupId } }]
    }).then(res => res.data.userCreate)
  }

  function show(userId) {
    return GraphQL.query({
      query: USER_QUERY,
      variables: { userId }
    }).then(res => res.data.user)
  }

  function update(userId, user) {
    return $http.put(url(), user).then(response => response.data)
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(response => response.data)
  }

  function destroy(userId) {
    return $http.delete(url(), { params: { userId } }).then(response => response.data)
  }
}
