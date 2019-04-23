;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCallingNumberDeliveryService',
      UserCallingNumberDeliveryService
    )

  function UserCallingNumberDeliveryService($http, Route) {
    var url = Route.api('/services/users/callingnumberdelivery')
    var service = { show: show, update: update, index: index }
    service.options = {}

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