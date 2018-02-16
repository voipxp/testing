;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanPinholeDigitPlanRedirectingService',
      UserOutgoingCallingPlanPinholeDigitPlanRedirectingService
    )

  function UserOutgoingCallingPlanPinholeDigitPlanRedirectingService(
    $http,
    Route
  ) {
    var service = { show: show, update: update }
    service.options = { userPermissions: ['Ignore', 'Allow'] }
    return service

    function url(id) {
      return Route.api('users')(
        id,
        'callingplans',
        'outgoing',
        'pinholedigitplan',
        'redirecting'
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
