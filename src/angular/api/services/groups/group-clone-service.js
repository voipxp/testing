import angular from 'angular'

angular.module('odin.api').factory('GroupCloneService', GroupCloneService)

GroupCloneService.$inject = ['$http', 'Route', '$rootScope']
function GroupCloneService($http, Route, $rootScope) {
  var service = { all, services }
  var url = Route.api('/groups/clone')
  return service

  function all(serviceProviderId, groupId, object) {
    return $http.put(url('group'), { ...object, serviceProviderId, groupId }).then(response => {
      $rootScope.$emit('GroupService:updated')
      return response.data
    })
  }

  function services(serviceProviderId, groupId, object) {
    return $http.put(url('services'), { ...object, serviceProviderId, groupId }).then(response => {
      $rootScope.$emit('GroupServiceService:updated')
      return response.data
    })
  }
}
