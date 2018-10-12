;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanPinholeDigitPlanOriginatingService',
      Service
    )

  function Service($http, Route) {
    var service = { show, update }
    service.options = {
      userPermissions: [
        'Ignore',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }
    var url = Route.api2(
      '/users/calling-plans/outgoing/pinhole-digit-plan/originating'
    )

    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
