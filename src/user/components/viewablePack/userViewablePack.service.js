;(function() {
  angular
    .module('odin.user')
    .factory('UserViewablePackService', UserViewablePackService)

  function UserViewablePackService($http, Route, $rootScope) {
    var service = { show: show, update: update }
    return service

    function url(userId, viewablePackId) {
      return Route.api('users', userId, 'viewablepacks')(viewablePackId)
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, viewablePackId) {
      return $http.put(url(userId, viewablePackId)).then(function(response) {
        $rootScope.$emit('UserViewablePackService:updated')
        return response.data
      })
    }
  }
})()
