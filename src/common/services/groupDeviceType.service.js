;(function() {
  angular.module('odin.common').factory('GroupDeviceTypeService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      show: show,
      rebuild: rebuild,
      reset: reset
    }
    return service

    function url(serviceProviderId, groupId, deviceType, command) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devicetypes',
        deviceType,
        command
      )()
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, deviceType) {
      return $http
        .get(url(serviceProviderId, groupId, deviceType))
        .then(function(response) {
          return response.data
        })
    }

    function rebuild(serviceProviderId, groupId, deviceType) {
      return $http
        .post(url(serviceProviderId, groupId, deviceType, 'rebuild'))
        .then(function(response) {
          return response.data
        })
    }

    function reset(serviceProviderId, groupId, deviceType) {
      return $http
        .post(url(serviceProviderId, groupId, deviceType, 'reset'))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
