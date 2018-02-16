;(function() {
  angular
    .module('odin.user')
    .factory('UserIncomingCallingPlanService', UserIncomingCallingPlanService)

  function UserIncomingCallingPlanService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      allowFromOutsideGroup: [
        'Allow',
        'Allow Only If Redirected From Another User',
        'Disallow'
      ]
    }
    return service

    function url(id) {
      return Route.api('users')(id, 'callingplans', 'incoming')
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
