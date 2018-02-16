;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupPagingGroupOriginatorService',
      GroupPagingGroupOriginatorService
    )

  function GroupPagingGroupOriginatorService($http, Route) {
    var service = { available: available, assigned: assigned, update: update }
    return service

    function url(id) {
      return Route.api('/services/groups/paging/groups')(id, 'originators')
    }

    function available(serviceProviderId, groupId) {
      var path = Route.api('/services/groups/paging/originators')()
      return $http
        .get(path, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function assigned(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, users) {
      var obj = { originators: users }
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
