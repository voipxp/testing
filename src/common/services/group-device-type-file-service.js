import angular from 'angular'

angular.module('odin.common').factory('GroupDeviceTypeFileService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, show, update }
  var url = Route.api('/groups/device-types/files')
  return service

  function index(serviceProviderId, groupId, deviceType) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, deviceType } })
      .then(res => res.data)
  }

  function show(serviceProviderId, groupId, deviceType, fileFormat) {
    return $http
      .get(url(), {
        params: { serviceProviderId, groupId, deviceType, fileFormat }
      })
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, deviceType, file) {
    return $http.put(url(), file).then(res => res.data)
  }
}
