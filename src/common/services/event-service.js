import angular from 'angular'

angular.module('odin.common').factory('EventService', EventService)

EventService.$inject = ['$http', 'Route']
function EventService($http, Route) {
  var url = Route.api('/events')
  var service = { index, show, types, logins }
  return service

  function index(limit) {
    return $http.get(url(), { params: { limit } }).then(res => res.data)
  }

  function types() {
    return $http.get(url('types')).then(res => res.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(res => res.data)
  }

  function logins(startTime, endTime) {
    return $http
      .get(url('logins'), { params: { startTime, endTime } })
      .then(res => res.data)
  }
}
