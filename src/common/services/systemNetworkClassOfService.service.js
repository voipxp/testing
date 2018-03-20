;(function() {
  angular
    .module('odin.common')
    .factory('SystemNetworkClassOfServiceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemNetworkClassOfServiceService')
    var url = Route.api('system', 'networkclassofservices')
    var service = { index: index, select: select, update: update }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function select(name) {
      return $http.post(url(), { name: name }).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function update(services) {
      return $http.put(url(), { services: services }).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
