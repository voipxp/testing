;(function() {
  angular
    .module('odin.group')
    .factory('GroupPagingGroupTargetService', GroupPagingGroupTargetService)

  function GroupPagingGroupTargetService($http, Route) {
    var service = { available: available, assigned: assigned, update: update }
    var url = Route.api('/groups/paging/targets')
    return service

    function available(serviceUserId) {
      return $http
        .get(url('available'), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function assigned(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, users) {
      var obj = {
        serviceUserId: serviceUserId,
        targets: users
      }
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
