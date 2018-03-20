;(function() {
  angular
    .module('odin.common')
    .factory('SystemNetworkClassOfServiceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemNetworkClassOfServiceService')
    var url = Route.api('system', 'networkclassofservices')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      usage: usage
    }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function store(service) {
      return $http.post(url(), service).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(name) {
      return $http.get(url(name)).then(function(response) {
        return response.data
      })
    }

    function update(name, service) {
      return $http.put(url(name), service).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function destroy(name) {
      return $http.delete(url(name)).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function usage(name) {
      return $http.get(url(name, 'usage')).then(function(response) {
        return response.data
      })
    }
  }
})()
