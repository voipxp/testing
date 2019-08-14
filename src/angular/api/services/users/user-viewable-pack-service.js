import angular from 'angular'

angular.module('odin.api').factory('UserViewablePackService', Service)

Service.$inject = ['$http', 'Route', '$rootScope']
function Service($http, Route, $rootScope) {
  var service = { show, update }
  var url = Route.api('/users/viewable-packs')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(userId, id) {
    return $http.put(url(), { userId, id }).then(response => {
      $rootScope.$emit('UserViewablePackService:updated')
      return response.data
    })
  }
}
