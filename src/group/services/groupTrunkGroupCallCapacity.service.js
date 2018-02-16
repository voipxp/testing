;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupTrunkGroupCallCapacityService',
      GroupTrunkGroupCallCapacityService
    )

  function GroupTrunkGroupCallCapacityService($http, Route) {
    var service = { show: show, update: update }
    service.options = {}
    return service

    function url(serviceProviderId, groupId) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'trunkgroup',
        'callcapacity'
      )
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
