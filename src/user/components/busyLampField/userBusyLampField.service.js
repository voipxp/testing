;(function() {
  angular
    .module('odin.user')
    .factory('UserBusyLampFieldService', UserBusyLampFieldService)

  function UserBusyLampFieldService($http, Route) {
    var url = Route.api('/services/users/busylampfield')
    var service = {
      show: show,
      update: update,
      index: index,
      availableusers: availableusers
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
    function availableusers(userId) {
      return $http
        .get(url(userId) + '/availableusers')
        .then(function(response) {
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
