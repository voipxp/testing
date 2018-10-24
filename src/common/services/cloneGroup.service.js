;(function() {
  angular.module('odin.common').factory('CloneGroupService', CloneGroupService)

  function CloneGroupService($http, Route, $rootScope) {
    var service = { all, services }
    var url = Route.api('/groups/clone')
    return service

    function all(serviceProviderId, groupId, obj) {
      return $http
        .put(url('group'), { ...obj, serviceProviderId, groupId })
        .then(res => {
          $rootScope.$emit('GroupService:updated')
          return res.data
        })
    }

    function services(serviceProviderId, groupId, obj) {
      return $http
        .put(url('services'), { ...obj, serviceProviderId, groupId })
        .then(res => {
          $rootScope.$emit('GroupServiceService:updated')
          return res.data
        })
    }
  }
})()
