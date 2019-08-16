import angular from 'angular'

angular.module('odin.api').factory('UserSharedCallAppearanceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/shared-call-appearance')

  var service = {
    show: show,
    update: update
  }
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }
  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
