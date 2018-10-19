;(function() {
  angular.module('odin.common').factory('UserNumberService', UserNumberService)

  function UserNumberService($http, Route) {
    var service = { index: index }
    var url = Route.api2('/users/dns')
    return service

    function index(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
