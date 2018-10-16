;(function() {
  angular
    .module('odin.common')
    .factory('SystemNetworkClassOfServiceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemNetworkClassOfServiceService')
    var url = Route.api2('/system/network-class-of-services')
    var service = { index, store, show, update, destroy, usage }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }

    function store(service) {
      return $http.post(url(), service).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function show(name) {
      return $http.get(url(), { params: { name } }).then(res => res.data)
    }

    function update(name, service) {
      return $http.put(url(), service).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function destroy(name) {
      return $http.delete(url(), { params: { name } }).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function usage(name) {
      return $http.get(url('usage'), { params: { name } }).then(res => res.data)
    }
  }
})()
