import angular from 'angular'

angular.module('odin.api').factory('GroupSearchService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups')
  return { index }
  function index(params) {
    return $http.get(url(), { params }).then(response => response.data)
  }
}
