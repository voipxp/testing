import angular from 'angular'

angular.module('odin.api').factory('UserSearchService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users')
  return { index }
  function index(params) {
    return $http.get(url(), { params }).then(response => response.data)
  }
}
