import angular from 'angular'

angular.module('odin.user').factory('UserAutomaticCallbackService', Controller)

Controller.$inject = ['$http', 'Route']
function Controller($http, Route) {
  var url = Route.api('/users/automatic-callback')
  var service = {
    index: index,
    show: show,
    update: update
  }

  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url('bulk'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

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
