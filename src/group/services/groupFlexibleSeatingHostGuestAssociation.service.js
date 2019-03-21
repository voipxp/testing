;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupFlexibleSeatingHostGuestAssociationService',
      GroupFlexibleSeatingHostGuestAssociationService
    )

  function GroupFlexibleSeatingHostGuestAssociationService($http, Route) {
    var url = Route.api('/groups/flexible-seating/host/guest-association')

    var service = {
      show: show,
      update: update
    }

    service.options = {
      accessLevels: ['Group', 'Enterprise'],
      minAssociationLimitHours: 1,
      maxAssociationLimitHours: 99
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
