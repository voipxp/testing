;(function() {
  angular
    .module('odin.user')
    .factory('UserCallingLineIdDeliveryBlockingService', Service)

  function Service($http, Route) {
    var url = Route.api('/services/users/callinglineiddeliveryblocking')
    var service = {
      show: show,
      update: update,
      bulk: bulk
    }

    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url(), data).then(function(response) {
        return response.data
      })
    }
  }
})()
