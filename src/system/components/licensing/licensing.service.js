;(function() {
  angular
    .module('odin.system')
    .factory('SystemLicensingService', SystemLicensingService)

  function SystemLicensingService($http, Route) {
    var url = Route.api2('/system/licensing')
    var service = { show }
    return service

    function show() {
      return $http.get(url()).then(res => res.data)
    }
  }
})()
