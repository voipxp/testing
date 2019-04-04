import angular from 'angular'

angular.module('odin.api').factory('GroupDeviceFileService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, show, update }
  var url = Route.api('/groups/devices/files')
  return service

  function index(serviceProviderId, groupId, deviceName) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, deviceName } })
      .then(response => response.data)
  }

  function show(serviceProviderId, groupId, deviceName, fileFormat) {
    return $http
      .get(url(), {
        params: { serviceProviderId, groupId, deviceName, fileFormat }
      })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, deviceName, file) {
    return $http.put(url(), file).then(response => response.data)
  }
}
