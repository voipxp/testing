;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanPinholeDigitPlanOriginatingService',
      GroupOutgoingCallingPlanPinholeDigitPlanOriginatingService
    )

  function GroupOutgoingCallingPlanPinholeDigitPlanOriginatingService(
    $http,
    Route
  ) {
    var service = { show: show, update: update }

    service.options = {
      permissions: [
        'Ignore',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'pinholedigitplan', 'originating')
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
