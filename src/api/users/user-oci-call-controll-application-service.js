import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserOCICallControlApplicationService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api('/users/call-control/applications')
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }

  function update(userId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
