import angular from 'angular'

angular.module('odin.common').factory('CloneGroupServiceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { autoAttendant }
  var url = Route.api('/groups/clone')
  return service

  function autoAttendant(serviceUserId, obj) {
    return $http
      .put(url('auto-attendant'), { ...obj, serviceUserId })
      .then(res => res.data)
  }
}
