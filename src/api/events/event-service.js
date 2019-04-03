import angular from 'angular'

angular.module('odin.api').factory('EventService', EventService)

EventService.$inject = ['$http', 'Route']
function EventService($http, Route) {
  var url = Route.api('/events')
  var service = { index, show, types, logins }
  return service

  function index(limit) {
    return $http
      .get(url(), { params: { limit } })
      .then(response => response.data)
  }

  function types() {
    return $http.get(url('types')).then(response => response.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function logins(startTime, endTime) {
    return $http
      .get(url('logins'), { params: { startTime, endTime } })
      .then(response => response.data)
  }
}
