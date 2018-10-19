;(function() {
  angular.module('odin.common').factory('CloneGroupServiceService', Service)

  function Service($http, Route) {
    var service = { autoAttendant }
    var url = Route.api2('/groups/clone')
    return service

    function autoAttendant(serviceUserId, obj) {
      return $http
        .put(url('auto-attendant'), { ...obj, serviceUserId })
        .then(res => res.data)
    }
  }
})()
