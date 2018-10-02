;(function() {
  angular
    .module('odin.user')
    .factory('UserCallTransferService', UserCallTransferService)

  function UserCallTransferService($http, Route) {
    var url = Route.api2('/users/call-transfer')
    var service = { show: show, update: update }
    service.options = {
      minRecallNumberOfRings: 2,
      maxRecallNumberOfRings: 20,
      minBusyCampOnSeconds: 30,
      maxBusyCampOnSeconds: 600
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
