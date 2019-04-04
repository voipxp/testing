import angular from 'angular'

angular.module('odin.api').factory('UserServiceSearchService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/services/search')
  return { index: index }

  function index(params) {
    return $http.get(url(), { params: params }).then(function(response) {
      return response.data
    })
  }
}
