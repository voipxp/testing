import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserCallingNameRetrievalService', UserCallingNameRetrievalService)

UserCallingNameRetrievalService.$inject = ['http', 'Route']
function UserCallingNameRetrievalService($http, Route) {
  var url = Route.api('/users/calling-name-retrieval')
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
