import angular from 'angular'

angular.module('odin.common').factory('CloneGroupService', CloneGroupService)

CloneGroupService.$inject = ['$http', 'Route', '$rootScope']
function CloneGroupService($http, Route, $rootScope) {
  var service = { all, services }
  var url = Route.api('/groups/clone')
  return service

  function all(serviceProviderId, groupId, object) {
    return $http
      .put(url('group'), { ...object, serviceProviderId, groupId })
      .then(response => {
        $rootScope.$emit('GroupService:updated')
        return response.data
      })
  }

  function services(serviceProviderId, groupId, object) {
    return $http
      .put(url('services'), { ...object, serviceProviderId, groupId })
      .then(response => {
        $rootScope.$emit('GroupServiceService:updated')
        return response.data
      })
  }
}
