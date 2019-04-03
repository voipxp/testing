import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserBusyLampFieldService', UserBusyLampFieldService)

UserBusyLampFieldService.$inject = ['$http', 'Route']
function UserBusyLampFieldService($http, Route) {
  var url = Route.api('/users/busy-lamp-field')
  var service = {
    show: show,
    update: update,
    users: users
  }
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function users(userId) {
    return $http
      .get(url('users'), { params: { userId: userId } })
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
