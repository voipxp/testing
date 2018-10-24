;(function() {
  angular.module('odin.user').factory('UserPhoneDirectoryService', Service)

  function Service($http, Route) {
    var service = { show }
    var url = Route.api('/users/phone-directory')
    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
