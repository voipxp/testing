;(function() {
  angular.module('odin.common').factory('GroupDeviceTypeTagService', Service)

  function Service($http, Route) {
    var service = { index, store, update, destroy }
    var url = Route.api2('/groups/device-types/tags')
    return service

    function index(serviceProviderId, groupId, deviceType) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, deviceType } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, deviceType, tag) {
      return $http
        .post(url(), { ...tag, serviceProviderId, groupId, deviceType })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, deviceType, tag) {
      return $http
        .put(url(), { ...tag, serviceProviderId, groupId, deviceType })
        .then(res => res.data)
    }

    function destroy(serviceProviderId, groupId, deviceType, tagName) {
      return $http
        .delete(url(), {
          params: { serviceProviderId, groupId, deviceType, tagName }
        })
        .then(res => res.data)
    }
  }
})()
