import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserIntegratedIMPService', UserIntegratedIMPService)

UserIntegratedIMPService.$inject = ['$http', 'Route']
function UserIntegratedIMPService($http, Route) {
  var url = Route.api('/users/integrated-imp')
  var service = { show: show, update: update }
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
