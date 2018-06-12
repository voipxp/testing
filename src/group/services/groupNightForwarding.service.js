;(function() {
  angular.module('odin.group').factory('GroupNightForwardingService', Service)

  function Service($http, Route) {
    var url = Route.api('/services/groups/nightforwarding')

    var service = {
      index: index,
      update: update
    }
    service.options = {
      activationMode: ['Auto On', 'On', 'Off']
    }

    return service
    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
