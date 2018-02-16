;(function() {
  angular
    .module('odin.group')
    .factory('GroupIncomingCallingPlanService', GroupIncomingCallingPlanService)

  function GroupIncomingCallingPlanService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      allowFromOutsideGroup: [
        'Allow',
        'Allow Only If Redirected From Another User',
        'Disallow'
      ]
    }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'incoming')
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
