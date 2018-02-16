;(function() {
  angular
    .module('odin.user')
    .factory('UserFaxMessagingService', UserFaxMessagingService)

  function UserFaxMessagingService($http, Route) {
    var url = Route.api('/services/users/faxmessaging')
    var service = { show: show, update: update }
    service.options = {}
    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
