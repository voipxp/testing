;(function() {
  angular.module('odin.common').factory('TaskService', TaskService)

  function TaskService($http, Route) {
    var url = Route.api2('/tasks')
    var service = { index, create, show }
    return service

    function index(limit, status, types) {
      var type = _.isArray(types) ? types.join(',') : types
      return $http
        .get(url(), { params: { limit, status, type } })
        .then(res => res.data)
    }

    function create(data) {
      return $http.post(url(), data).then(res => res.data)
    }

    function show(id) {
      return $http.get(url(), { params: { id } }).then(res => res.data)
    }
  }
})()
