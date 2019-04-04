import angular from 'angular'

angular.module('odin.api').factory('UserFlexibleSeatingGuestService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/flexible-seating')

  var service = {
    show: show,
    update: update
  }

  service.options = {}
  return service

  function show(userId) {
    return $http
      .get(url('guest'), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(object) {
    return $http.put(url('guest'), object).then(function(response) {
      return response.data
    })
  }
}
