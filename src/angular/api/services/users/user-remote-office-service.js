import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserRemoteOfficeService', UserRemoteOfficeService)

UserRemoteOfficeService.$inject = ['$http', 'Route']
function UserRemoteOfficeService($http, Route) {
  var url = Route.api('/users/remote-office')
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
