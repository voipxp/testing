;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanTransferNumberService',
      GroupOutgoingCallingPlanTransferNumberService
    )

  function GroupOutgoingCallingPlanTransferNumberService($http, Route) {
    var service = { show: show, update: update }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'transfernumbers')
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
