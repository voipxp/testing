;(function() {
  angular.module('odin.common').factory('UserLoginService', UserLoginService)

  function UserLoginService($http, Route) {
    var service = { show: show }
    var url = Route.api('users')
    return service

    function show(userId) {
      return $http.get(url(userId, 'login')).then(function(response) {
        return response.data
      })
    }
  }
})()
