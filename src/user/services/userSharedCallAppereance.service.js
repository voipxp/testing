;(function() {
  angular
    .module('odin.user')
    .factory('UserSharedCallAppereanceService', UserSharedCallAppereanceService)

  function UserSharedCallAppereanceService($http, Route) {
    var url = Route.api('/services/users/sharedcallappearance')

    var service = { show: show, update: update }
    return service

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }
    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
