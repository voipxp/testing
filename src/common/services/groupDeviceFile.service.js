;(function() {
  angular.module('odin.common').factory('GroupDeviceFileService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      show: show,
      update: update
    }
    return service

    function url(serviceProviderId, groupId, deviceName, fileFormat) {
      if (fileFormat) {
        fileFormat = encodeURIComponent(fileFormat)
      }
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devices',
        deviceName,
        'files',
        fileFormat
      )()
    }

    function index(serviceProviderId, groupId, deviceName) {
      return $http
        .get(url(serviceProviderId, groupId, deviceName))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, deviceName, fileFormat) {
      return $http
        .get(url(serviceProviderId, groupId, deviceName, fileFormat))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, deviceName, file) {
      return $http
        .put(url(serviceProviderId, groupId, deviceName, file.fileFormat), file)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
