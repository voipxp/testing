import angular from 'angular'
angular.module('odin.vdm').factory('VdmGroupDeviceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index }
  var url = Route.api('/vdm/groups/devices')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }
}
