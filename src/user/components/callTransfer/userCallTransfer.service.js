;(function() {
  angular
    .module('odin.user')
    .factory('UserCallTransferService', UserCallTransferService)

  function UserCallTransferService($http, Route) {
    var url = Route.api('/services/users/calltransfer')
    var service = { show: show, update: update, index: index }
    service.options = {
      minRecallNumberOfRings: 2,
      maxRecallNumberOfRings: 20,
      minBusyCampOnSeconds: 30,
      maxBusyCampOnSeconds: 600
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
        console.log(response.data)
        return response.data
      })
    }
  }
})()
