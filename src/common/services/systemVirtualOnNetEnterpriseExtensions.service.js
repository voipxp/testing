;(function() {
  angular
    .module('odin.common')
    .factory('SystemVirtualOnNetEnterpriseExtensionsService', System)

  function System($http, CacheFactory, Route) {
    var url = Route.api2('/system/virtual-on-net-enterprise-extensions')
    var cache = CacheFactory('SystemVirtualOnNetEnterpriseExtensionsService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
