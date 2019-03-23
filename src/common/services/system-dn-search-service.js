import angular from 'angular'

angular.module('odin.common').factory('SystemDnSearchService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/dns/search')
  return { index }
  function index(params) {
    return $http.get(url(), { params: params }).then(res => res.data)
  }
}
