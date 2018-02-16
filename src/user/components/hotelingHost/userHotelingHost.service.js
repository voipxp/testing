;(function() {
  angular
    .module('odin.user')
    .factory('UserHotelingHostService', UserHotelingHostService)

  function UserHotelingHostService($http, Route) {
    var url = Route.api('/services/users/hotelinghost')
    var service = { show: show, update: update, index: index }
    service.options = {
      accessLevels: ['Enterprise', 'Group'],
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
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
