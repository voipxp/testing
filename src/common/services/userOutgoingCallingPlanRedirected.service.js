;(function() {
  angular
    .module('odin.common')
    .factory('UserOutgoingCallingPlanRedirectedService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update, bulk: bulk }
    return service

    function url(id) {
      return Route.api('users')(id, 'callingplans', 'outgoing', 'redirected')
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }

    function bulk(data) {
      var route = Route.api('callingplans', 'users', 'outgoing', 'redirected')
      return $http.put(route(), data).then(function(response) {
        return response.data
      })
    }
  }
})()
