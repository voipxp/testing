;(function() {
  angular.module('odin.vdm').factory('VdmGroupDeviceService', Service)

  function Service($http, Route) {
    var service = { index: index }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api('vdm', 'group', serviceProviderId, groupId, 'devices')()
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
