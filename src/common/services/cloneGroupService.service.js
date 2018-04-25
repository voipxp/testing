;(function() {
  angular.module('odin.common').factory('CloneGroupServiceService', Service)

  function Service($http, Route) {
    var service = { autoAttendant: autoAttendant }
    return service

    function url(service, serviceUserId) {
      return Route.api('/clone/services')(service, serviceUserId)
    }

    function autoAttendant(id, obj) {
      return $http.put(url('autoattendant', id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
