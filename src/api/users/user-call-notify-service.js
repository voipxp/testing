import angular from 'angular'

angular.module('odin.api').factory('UserCallNotifyService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/call-notify')
  var service = { show: show, update: update }

  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, settings) {
    return $http.put(url(), settings).then(function(response) {
      return response.data
    })
  }
}
