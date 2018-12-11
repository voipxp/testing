;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupHuntGroupWeightedCallDistributionService',
      GroupHuntGroupWeightedCallDistributionService
    )

  function GroupHuntGroupWeightedCallDistributionService($http, Route) {
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
})()
