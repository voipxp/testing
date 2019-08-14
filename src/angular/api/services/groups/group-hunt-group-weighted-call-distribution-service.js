import angular from 'angular'

angular.module('odin.api').factory('GroupHuntGroupWeightedCallDistributionService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/hunt-groups/weighted-call-distribution')

  var service = {
    update: update
  }
  return service

  function update(huntgroup) {
    return $http.put(url(), huntgroup).then(function(response) {
      return response.data
    })
  }
}
