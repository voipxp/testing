import angular from 'angular'

angular.module('odin.api').factory('SystemFileService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/files')
  var service = { show }
  return service

  function show(fileName) {
    return $http
      .get(url(), { params: { fileName } })
      .then(response => response.data)
  }
}
