;(function() {
  angular.module('odin.vdm').factory('VdmGroupDeviceService', Service)

  function Service($http, Route) {
    var service = { index }
    var url = Route.api2('/vdm/groups/devices')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }
  }
})()
