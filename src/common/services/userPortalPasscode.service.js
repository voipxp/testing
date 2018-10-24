;(function() {
  angular.module('odin.common').factory('UserPortalPasscodeService', Service)

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api('/users/portal-passcode')
    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
