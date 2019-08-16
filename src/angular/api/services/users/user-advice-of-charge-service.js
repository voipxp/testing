import angular from 'angular'

angular.module('odin.api').factory('UserAdviceOfChargeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/advice-of-charge')
  var service = {
    show: show,
    update: update
  }
  service.options = {
    aocTypes: ['During Call', 'End Of Call']
  }
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
