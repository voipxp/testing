;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService',
      UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService
    )

  function UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService(
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
        'callmenow'
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
