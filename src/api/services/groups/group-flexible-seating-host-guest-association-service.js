import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupFlexibleSeatingHostGuestAssociationService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
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

  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
