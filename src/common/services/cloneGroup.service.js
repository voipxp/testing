;(function() {
  angular.module('odin.common').factory('CloneGroupService', CloneGroupService)

  function CloneGroupService($http, Route) {
    var service = { store: store }
    return service

    function url() {
      return Route.api('/replicate/groups/all')()
    }

    function store(obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
