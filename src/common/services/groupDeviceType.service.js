;(function() {
  angular.module('odin.common').factory('GroupDeviceTypeService', Service)

  function Service($http, Route) {
    var service = { index, show, rebuild, reset }
    var url = Route.api2('/groups/device-types')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function show(serviceProviderId, groupId, deviceType) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, deviceType } })
        .then(res => res.data)
    }

    function rebuild(serviceProviderId, groupId, deviceType) {
      return $http
        .post(url('rebuild'), { serviceProviderId, groupId, deviceType })
        .then(res => res.data)
    }

    function reset(serviceProviderId, groupId, deviceType) {
      return $http
        .post(url('reset'), { serviceProviderId, groupId, deviceType })
        .then(res => res.data)
    }
  }
})()
