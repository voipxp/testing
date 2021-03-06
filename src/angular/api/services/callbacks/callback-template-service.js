import angular from 'angular'

angular.module('odin.api').factory('CallbackTemplateService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/callbacks/templates')
  var service = { index, show }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }
}
