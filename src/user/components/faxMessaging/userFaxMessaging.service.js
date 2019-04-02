;(function() {
  angular
    .module('odin.user')
    .factory('UserFaxMessagingService', UserFaxMessagingService)

  function UserFaxMessagingService($http, Route) {
    var url = Route.api('/users/fax-messaging')
    var service = { show: show, update: update }
    service.options = {}
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, object) {
      return $http.put(url(), object).then(function(response) {
        return response.data
      })
    }
  }
})()
