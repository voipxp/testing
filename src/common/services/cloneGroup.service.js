;(function() {
  angular.module('odin.common').factory('CloneGroupService', CloneGroupService)

  function CloneGroupService($http, Route, $rootScope) {
    var service = { all: all }
    return service

    function url(serviceProviderId, groupId, path) {
      return Route.api('/clone/groups')(serviceProviderId, groupId, path)
    }

    function all(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          $rootScope.$emit('GroupService:updated')
          return response.data
        })
    }
  }
})()
