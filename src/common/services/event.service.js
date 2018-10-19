;(function() {
  angular.module('odin.common').factory('EventService', EventService)

  function EventService($http, Route) {
    var url = Route.api2('/events')
    var service = { index, show, types }
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
  }
})()
