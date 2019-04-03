import angular from 'angular'

angular.module('odin.api').factory('GroupServiceCloneService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { autoAttendant }
  var url = Route.api('/groups/clone')
  return service

  function autoAttendant(serviceUserId, object) {
    return $http
      .put(url('auto-attendant'), { ...object, serviceUserId })
      .then(response => response.data)
  }
}
