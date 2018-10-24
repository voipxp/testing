;(function() {
  angular
    .module('odin.common')
    .factory('UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService', Service)

  function Service($http, Route) {
    var service = { show, update }
    service.options = { userPermissions: ['Ignore', 'Allow'] }
    var url = Route.api(
      '/users/calling-plans/outgoing/pinhole-digit-plan/call-me-now'
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
