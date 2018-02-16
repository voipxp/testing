;(function() {
  angular.module('odin.common').factory('EventService', EventService)

  function EventService($http, Route) {
    var url = Route.api('events')
    var service = { index: index, show: show, types: types }
    return service

    function index(limit) {
      return $http
        .get(url(), { params: { limit: limit } })
        .then(function(response) {
          return response.data
        })
    }

    function types() {
      return $http.get(url('types')).then(function(response) {
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
