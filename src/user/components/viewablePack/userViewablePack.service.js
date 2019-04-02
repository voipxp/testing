;(function() {
  angular.module('odin.user').factory('UserViewablePackService', Service)

  function Service($http, Route, $rootScope) {
    var service = { show, update }
    var url = Route.api('/users/viewable-packs')
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId } })
        .then(response => response.data)
    }

    function update(userId, id) {
      return $http.put(url(), { userId, id }).then(response => {
        $rootScope.$emit('UserViewablePackService:updated')
        return response.data
      })
    }
  }
})()
