;(function() {
  angular.module('odin.user').factory('UserCallForwardingBusyService', Service)

  function Service($http, Route, CacheFactory) {
    var url = Route.api('/services/users/callforwardingbusy')
    var service = { show: show, update: update, bulk: bulk }
    service.options = {
      outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
    }
    var cache = CacheFactory('UserCallForwardingBusyService')
    return service

    function show(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url(), data).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
