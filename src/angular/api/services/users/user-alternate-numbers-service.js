import angular from 'angular'

angular.module('odin.api').factory('UserAlternateNumbersService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/alternate-numbers')
  var service = { show: show, update: update }
  service.options = {
    ringPatterns: [
      'Normal',
      'Long-Long',
      'Short-Short-Long',
      'Short-Long-Short'
    ]
  }
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(settings) {
    return $http.put(url(), settings).then(function(response) {
      return response.data
    })
  }
}
