import angular from 'angular'

angular.module('odin.api').factory('UserPrivacyService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { available: available, show: show, update: update }
  var url = Route.api('/users/privacy')
  return service

  function available(userId) {
    return $http.get(url('monitors'), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function update(data) {
    return $http.put(url(), data).then(function(response) {
      return response.data
    })
  }
}
