import angular from 'angular'

angular.module('odin.common').factory('GroupDeviceTypeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, show, rebuild, reset }
  var url = Route.api('/groups/device-types')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function show(serviceProviderId, groupId, deviceType) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, deviceType } })
      .then(response => response.data)
  }

  function rebuild(serviceProviderId, groupId, deviceType) {
    return $http
      .post(url('rebuild'), { serviceProviderId, groupId, deviceType })
      .then(response => response.data)
  }

  function reset(serviceProviderId, groupId, deviceType) {
    return $http
      .post(url('reset'), { serviceProviderId, groupId, deviceType })
      .then(response => response.data)
  }
}
