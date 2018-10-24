;(function() {
  angular.module('odin.common').factory('GroupDeviceFileService', Service)

  function Service($http, Route) {
    var service = { index, show, update }
    var url = Route.api('/groups/devices/files')
    return service

    function index(serviceProviderId, groupId, deviceName) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, deviceName } })
        .then(res => res.data)
    }

    function show(serviceProviderId, groupId, deviceName, fileFormat) {
      return $http
        .get(url(), {
          params: { serviceProviderId, groupId, deviceName, fileFormat }
        })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, deviceName, file) {
      return $http.put(url(), file).then(res => res.data)
    }
  }
})()
