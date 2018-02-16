;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanCallMeNowService',
      GroupOutgoingCallingPlanCallMeNowService
    )

  function GroupOutgoingCallingPlanCallMeNowService($http, Route) {
    var service = { show: show, update: update, users: users }

    return service

    function url(serviceProviderId, groupId, opt) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'callmenow', opt)
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

    function users(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId, 'users'))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
