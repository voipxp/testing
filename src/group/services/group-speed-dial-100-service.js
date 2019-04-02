import angular from 'angular'

angular.module('odin.group').factory('GroupSpeedDial100Service', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/speed-dial-100')

  var service = {
    show: show,
    update: update
  }
  service.options = {
    minLength: 1,
    maxLength: 2
  }

  return service
  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
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
