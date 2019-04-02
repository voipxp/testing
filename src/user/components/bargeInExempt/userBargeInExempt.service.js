;(function() {
  angular.module('odin.user').factory('UserBargeInExemptService', Controller)

  function Controller($http, Route) {
    var url = Route.api('/users/barge-in-exempt')
    var service = {
      show: show,
      update: update
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, object) {
      return $http.put(url(), object).then(function(response) {
        return response.data
      })
    }
  }
})()
