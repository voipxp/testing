;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanDigitPlanOriginatingService',
      UserOutgoingCallingPlanDigitPlanOriginatingService
    )

  function UserOutgoingCallingPlanDigitPlanOriginatingService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      userPermissions: [
        'Disallow',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }
    return service

    function url(id) {
      return Route.api('users')(
        id,
        'callingplans',
        'outgoing',
        'digitplan',
        'originating'
      )
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
