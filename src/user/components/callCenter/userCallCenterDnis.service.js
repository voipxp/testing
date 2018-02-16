;(function() {
  angular
    .module('odin.user')
    .factory('UserCallCenterDnisService', UserCallCenterDnisService)

  function UserCallCenterDnisService($http, Route) {
    var url = Route.api('/services/users/callcenter/dnis')
    var service = { index: index }
    return service

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
  }
})()
