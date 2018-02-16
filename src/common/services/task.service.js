;(function() {
  angular.module('odin.common').factory('TaskService', TaskService)

  function TaskService($http, Route) {
    var url = Route.api('tasks')
    var service = { index: index, create: create, show: show }
    return service

    function index(limit, status, types) {
      var _types = _.isArray(types) ? types.join(',') : types
      return $http
        .get(url(), {
          params: { limit: limit, status: status, type: _types }
        })
        .then(function(response) {
          return response.data
        })
    }

    function create(data) {
      return $http.post(url(), data).then(function(response) {
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
