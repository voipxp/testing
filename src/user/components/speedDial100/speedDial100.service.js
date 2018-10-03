;(function() {
  angular
    .module('odin.user')
    .factory('SpeedDial100Service', SpeedDial100Service)

  function SpeedDial100Service($http, Route) {
    var url = Route.api2('/users/speed-dial-100')
    var service = {
      index: index,
      update: update,
      store: store,
      destroy: destroy
    }
    return service

    function index(userId) {
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

    function store(userId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, obj) {
      return $http.delete(url(), { data: obj }).then(function(response) {
        return response.data
      })
    }
  }
})()
