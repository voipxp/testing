;(function() {
  angular
    .module('odin.user')
    .factory('UserCallForwardingAlwaysService', Service)

  function Service($http, Route, CacheFactory) {
    var url = Route.api2('/users/call-forwarding-always')
    var service = { index: index, show: show, update: update, bulk: bulk }
    service.options = {
      outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
    }
    var cache = CacheFactory('UserCallForwardingAlwaysService')
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
        .get(url(), { params: { userId: userId }, cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url('bulk'), data).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
