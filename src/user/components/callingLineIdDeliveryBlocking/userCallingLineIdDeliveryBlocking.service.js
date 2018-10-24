;(function() {
  angular
    .module('odin.user')
    .factory('UserCallingLineIdDeliveryBlockingService', Service)

  function Service($http, Route) {
    var url = Route.api('/users/calling-line-id-delivery-blocking')
    var service = {
      index: index,
      show: show,
      update: update,
      bulk: bulk
    }

    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url('bulk'), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function show(userId) {
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

    function bulk(data) {
      return $http.put(url('bulk'), data).then(function(response) {
        return response.data
      })
    }
  }
})()
