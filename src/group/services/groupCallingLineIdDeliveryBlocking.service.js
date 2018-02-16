;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallingLineIdDeliveryBlockingService', Service)

  function Service($http, Route) {
    var url = Route.api('/services/users/callinglineiddeliveryblocking/users')

    var service = {
      users: users
    }

    return service

    function users(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
