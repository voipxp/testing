;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterBouncedCallService',
      GroupCallCenterBouncedCallService
    )

  function GroupCallCenterBouncedCallService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/bouncedcalls')
    var service = { show: show, update: update }
    service.options = {
      numberOfRingsBeforeBouncingCall: { min: 1, max: 20 },
      alertCallCenterCallOnHoldSeconds: { min: 30, max: 600 },
      bounceCallCenterCallOnHoldSeconds: { min: 30, max: 600 }
    }
    return service

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
