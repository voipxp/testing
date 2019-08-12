import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.api').factory('GroupService', GroupService)

GroupService.$inject = ['$http', 'Route', 'GraphQL']
function GroupService($http, Route, GraphQL) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/groups')

  const GROUP_LIST = gql`
    query groups($serviceProviderId: String!) {
      groups(serviceProviderId: $serviceProviderId) {
        _id
        groupId
        groupName
        userLimit
      }
    }
  `

  const GROUP_SHOW = gql`
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

  return service

  function index(serviceProviderId) {
    return GraphQL.query({
      query: GROUP_LIST,
      variables: { serviceProviderId }
    }).then(res => res.data.groups)
  }

  function store(serviceProviderId, group) {
    return $http.post(url(), group).then(response => {
      return response.data
    })
  }

  function show(serviceProviderId, groupId) {
    return GraphQL.query({
      query: GROUP_SHOW,
      variables: { serviceProviderId, groupId }
    }).then(res => res.data.group)
  }

  function update(serviceProviderId, group) {
    return $http.put(url(), group).then(response => {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId } })
      .then(response => {
        return response.data
      })
  }
}
