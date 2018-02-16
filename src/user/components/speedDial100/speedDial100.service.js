;(function() {
  angular
    .module('odin.user')
    .factory('SpeedDial100Service', SpeedDial100Service)

  function SpeedDial100Service($http, Route) {
    var url = Route.api('/services/users/speeddial100')
    var service = {
      index: index,
      update: update,
      create: create,
      destroy: destroy
    }
    service.options = {
      speedCodes: Array.apply(null, { length: 100 }).map(Number.call, Number)
    }
    return service

    function index(userId) {
      return $http.get(url(userId) + '/speedcodes').then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http
        .put(url(userId) + '/speedcodes', obj)
        .then(function(response) {
          return response.data
        })
    }

    function create(userId, obj) {
      return $http
        .post(url(userId) + '/speedcodes', obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, obj) {
      return $http
        .delete(url(userId) + '/speedcodes', { data: obj })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
