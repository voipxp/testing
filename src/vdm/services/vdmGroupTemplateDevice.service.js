;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateDeviceService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store
    }
    return service

    function url(serviceProviderId, groupId, templateId, deviceId) {
      return Route.api(
        'vdm',
        'group',
        serviceProviderId,
        groupId,
        'templates',
        templateId,
        'devices',
        deviceId
      )()
    }

    function index(serviceProviderId, groupId, templateId) {
      return $http
        .get(url(serviceProviderId, groupId, templateId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, templateId, deviceName) {
      return $http
        .post(url(serviceProviderId, groupId, templateId, deviceName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
