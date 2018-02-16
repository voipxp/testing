;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanOriginatingService',
      GroupOutgoingCallingPlanOriginatingService
    )

  function GroupOutgoingCallingPlanOriginatingService($http, Route) {
    var service = { show: show, update: update, users: users }

    service.options = {
      permissions: [
        'Disallow',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }

    return service

    function url(serviceProviderId, groupId, opt) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'originating', opt)
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
