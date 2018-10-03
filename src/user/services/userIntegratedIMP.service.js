;(function() {
  angular
    .module('odin.provisioning')
    .factory('UserIntegratedIMPService', UserIntegratedIMPService)

  function UserIntegratedIMPService($http, Route) {
    var url = Route.api('/users/integrated-imp')
    var service = { show: show, update: update }
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
