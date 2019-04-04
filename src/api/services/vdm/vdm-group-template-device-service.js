import angular from 'angular'

angular.module('odin.api').factory('VdmGroupTemplateDeviceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store }
  var url = Route.api('/vdm/groups/templates/devices')
  return service

  function index(serviceProviderId, groupId, templateId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, templateId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, templateId, deviceName) {
    return $http
      .post(url(), { serviceProviderId, groupId, templateId, deviceName })
      .then(response => response.data)
  }
}
