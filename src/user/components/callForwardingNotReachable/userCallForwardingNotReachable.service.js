;(function() {
  angular
    .module('odin.user')
    .factory('UserCallForwardingNotReachableService', Service)

  function Service($http, Route) {
    var url = Route.api2('/users/call-forwarding-not-reachable')
    var service = { show: show, update: update, bulk: bulk }
    service.options = {
      outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url('bulk'), data).then(function(response) {
        return response.data
      })
    }
  }
})()
