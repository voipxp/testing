;(function() {
  angular.module('odin.common').factory('GroupDeviceTypeFileService', Service)

  function Service($http, Route) {
    var service = { index: index, show: show, update: update }
    return service

    function url(serviceProviderId, groupId, deviceType, fileFormat) {
      return Route.api()(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devicetypes',
        deviceType,
        'files',
        fileFormat
      )
    }

    function index(serviceProviderId, groupId, deviceType) {
      return $http
        .get(url(serviceProviderId, groupId, deviceType))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, deviceType, fileFormat) {
      return $http
        .get(url(serviceProviderId, groupId, deviceType, fileFormat))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, deviceType, file) {
      return $http
        .put(url(serviceProviderId, groupId, deviceType, file.fileFormat), file)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
