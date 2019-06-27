import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.api').factory('UserService', UserService)

UserService.$inject = ['$http', 'Route', 'apollo']
function UserService($http, Route, apollo) {
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

  function index(serviceProviderId, groupId, extended = []) {
    let extendedQuery = ''
    if (extended.length > 0) {
      extendedQuery = `
        user {
          ${extended.join('\n')}
        }
      `
    }
    const query = gql`
      query users($serviceProviderId: String!, $groupId: String!) {
        users(serviceProviderId: $serviceProviderId, groupId: $groupId) {
          _id
          userId
          serviceProviderId
          groupId
          lastName
          firstName
          department
          phoneNumber
          phoneNumberActivated
          emailAddress
          extension
          countryCode
          nationalPrefix
          ${extendedQuery}
        }
      }
    `
    return apollo
      .query({
        query,
        variables: { serviceProviderId, groupId },
        fetchPolicy: 'network-only'
      })
      .then(res => res.data.users)
  }

  function info(userId) {
    return $http
      .get(url('login'), { params: { userId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, user) {
    return $http
      .post(url(), { ...user, serviceProviderId, groupId })
      .then(response => response.data)
  }

  function show(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }

  function update(userId, user) {
    return $http.put(url(), user).then(response => response.data)
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(response => response.data)
  }

  function destroy(userId) {
    return $http
      .delete(url(), { params: { userId } })
      .then(response => response.data)
  }
}
