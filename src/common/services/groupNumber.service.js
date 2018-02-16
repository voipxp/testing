;(function() {
  angular
    .module('odin.common')
    .factory('GroupNumberService', GroupNumberService)

  function GroupNumberService($http, Route) {
    var service = {
      index: index,
      assign: assign,
      unassign: unassign,
      update: update
    }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('dns')
    }

    // activated, summary, default
    function index(serviceProviderId, groupId, query) {
      return $http
        .get(url(serviceProviderId, groupId), { params: { q: query } })
        .then(function(response) {
          return response.data
        })
    }

    function assign(serviceProviderId, groupId, dns) {
      return $http
        .post(url(serviceProviderId, groupId), dns)
        .then(function(response) {
          return response.data
        })
    }

    function unassign(serviceProviderId, groupId, dns) {
      return $http
        .delete(url(serviceProviderId, groupId), { data: dns })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, dns) {
      return $http
        .put(url(serviceProviderId, groupId), dns)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
