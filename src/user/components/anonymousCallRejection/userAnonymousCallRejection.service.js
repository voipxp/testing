;(function() {
  angular
    .module('odin.user')
    .factory('UserAnonymousCallRejectionService', Controller)

  function Controller($http, Route) {
    var url = Route.api('/users/anonymous-call-rejection')
    var service = {
      index: index,
      show: show,
      update: update
    }

    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url('bulk'), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(object) {
      return $http.put(url(), object).then(function(response) {
        return response.data
      })
    }
  }
})()
