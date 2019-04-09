import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemVirtualOnNetEnterpriseExtensionsService', System)

System.$inject = ['$http', 'CacheFactory', 'Route']
function System($http, CacheFactory, Route) {
  var url = Route.api('/system/virtual-on-net-enterprise-extensions')
  var cache = CacheFactory('SystemVirtualOnNetEnterpriseExtensionsService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
