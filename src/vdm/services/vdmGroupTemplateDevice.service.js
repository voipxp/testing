;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateDeviceService', Service)

  function Service($http, Route) {
    var service = { index, store }
    var url = Route.api2('/vdm/groups/templates/devices')
    return service

    function index(serviceProviderId, groupId, templateId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, templateId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, templateId, deviceName) {
      return $http
        .post(url(), { serviceProviderId, groupId, templateId, deviceName })
        .then(res => res.data)
    }
  }
})()
