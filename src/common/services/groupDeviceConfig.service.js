;(function() {
  angular.module('odin.common').factory('GroupDeviceConfigService', Service)

  function Service($http, Route) {
    var service = { rebuild: rebuild, reset: reset }
    return service

    function url(serviceProviderId, groupId, device, command) {
      var deviceId = (device && device.deviceName) || device
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devices',
        deviceId,
        command
      )()
    }

    function rebuild(serviceProviderId, groupId, device) {
      return $http
        .post(url(serviceProviderId, groupId, device, 'rebuild'))
        .then(function(response) {
          return response.data
        })
    }

    function reset(serviceProviderId, groupId, device) {
      return $http
        .post(url(serviceProviderId, groupId, device, 'reset'))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
