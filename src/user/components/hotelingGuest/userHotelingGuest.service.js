;(function() {
  angular
    .module('odin.user')
    .factory('UserHotelingGuestService', UserHotelingGuestService)

  function UserHotelingGuestService($http, Route) {
    var url = Route.api('/services/users/hotelingguest')
    var service = { show: show, update: update, index: index }
    service.options = {
      minAssociationLimitHours: 1,
      maxAssociationLimitHours: 999
    }
    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http
        .get(url(userId) + '/availableusers')
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      console.log('UserHotelingGuestService.update')
      console.log(obj)
      return $http.put(url(userId), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
