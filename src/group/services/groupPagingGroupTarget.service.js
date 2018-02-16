;(function() {
  angular
    .module('odin.group')
    .factory('GroupPagingGroupTargetService', GroupPagingGroupTargetService)

  function GroupPagingGroupTargetService($http, Route) {
    var service = { available: available, assigned: assigned, update: update }
    return service

    function url(id) {
      return Route.api('/services/groups/paging/groups')(id, 'targets')
    }

    function available(serviceUserId) {
      var path = Route.api('/services/groups/paging/targets')()
      return $http
        .get(path, { params: { serviceUserId: serviceUserId } })
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
      var obj = { targets: users }
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
