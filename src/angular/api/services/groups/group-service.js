import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.api').factory('GroupService', GroupService)

GroupService.$inject = [
  '$http',
  'Route',
  'CacheFactory',
  '$rootScope',
  'GraphQL'
]
function GroupService($http, Route, CacheFactory, $rootScope, GraphQL) {
  var service = { index, store, show, update, destroy }
  var cache = CacheFactory('GroupService')
  var url = Route.api('/groups')

  $rootScope.$on('GroupService:updated', clearCache)

  return service

  function clearCache() {
    cache.removeAll()
  }

  function index(serviceProviderId) {
    const query = gql`
      query groups($serviceProviderId: String!) {
        groups(serviceProviderId: $serviceProviderId) {
          _id
          groupId
          groupName
          userLimit
        }
      }
    `
    return GraphQL.query({
      query,
      variables: { serviceProviderId },
      fetchPolicy: 'network-only'
    }).then(res => res.data.groups)
  }

  function store(serviceProviderId, group) {
    return $http.post(url(), group).then(response => {
      clearCache()
      return response.data
    })
  }

  function show(serviceProviderId, groupId) {
    const query = gql`
      query group($serviceProviderId: String!, $groupId: String!) {
        group(serviceProviderId: $serviceProviderId, groupId: $groupId) {
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
      }
    `
    return GraphQL.query({
      query,
      variables: { serviceProviderId, groupId },
      fetchPolicy: 'network-only'
    }).then(res => res.data.group)
  }

  function update(serviceProviderId, group) {
    return $http.put(url(), group).then(response => {
      clearCache()
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId } })
      .then(response => {
        clearCache()
        return response.data
      })
  }
}
