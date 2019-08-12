import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemVirtualOnNetEnterpriseExtensionsService', System)

System.$inject = ['$http', 'Route']
function System($http, Route) {
  var url = Route.api('/system/virtual-on-net-enterprise-extensions')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
