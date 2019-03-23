import angular from 'angular'

angular.module('odin.common').factory('GroupDeviceTagService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, update, destroy }
  var url = Route.api('/groups/devices/tags')
  return service

  function index(serviceProviderId, groupId, deviceName) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, deviceName } })
      .then(res => res.data)
  }

  function store(serviceProviderId, groupId, deviceName, tag) {
    return $http
      .post(url(), { ...tag, serviceProviderId, groupId, deviceName })
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, deviceName, tag) {
    return $http
      .put(url(), { ...tag, serviceProviderId, groupId, deviceName })
      .then(res => res.data)
  }

  function destroy(serviceProviderId, groupId, deviceName, tagName) {
    return $http
      .delete(url(), {
        params: { serviceProviderId, groupId, deviceName, tagName }
      })
      .then(res => res.data)
  }
}
