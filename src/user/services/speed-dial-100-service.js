import angular from 'angular'

angular.module('odin.user').factory('SpeedDial100Service', SpeedDial100Service)

SpeedDial100Service.$inject = ['$http', 'Route']
function SpeedDial100Service($http, Route) {
  var url = Route.api('/users/speed-dial-100')
  var service = {
    index: index,
    update: update,
    store: store,
    destroy: destroy
  }
  return service

  function index(userId) {
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

  function store(userId, object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, object) {
    return $http.delete(url(), { data: object }).then(function(response) {
      return response.data
    })
  }
}
