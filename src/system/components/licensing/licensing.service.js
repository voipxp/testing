;(function() {
  angular
    .module('odin.system')
    .factory('SystemLicensingService', SystemLicensingService)

  function SystemLicensingService($http, Route) {
    var url = Route.api('/system/licensing')
    var service = { show: show }
    return service

    function show() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }
  }
})()
