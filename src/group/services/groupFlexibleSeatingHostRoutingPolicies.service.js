;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupFlexibleSeatingHostRoutingPoliciesService',
      GroupFlexibleSeatingHostRoutingPoliciesService
    )

  function GroupFlexibleSeatingHostRoutingPoliciesService($http, Route) {
    var url = Route.api('/groups/flexible-seating/host/routing-policies')

    var service = {
      show: show,
      update: update
    }
    return service

    function show(serviceUserId) {
      return $http
        .get(url(), {
          params: { serviceUserId: serviceUserId }
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
