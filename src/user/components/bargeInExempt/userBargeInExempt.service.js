;(function() {
  angular.module('odin.user').factory('UserBargeInExemptService', Controller)

  function Controller($http, Route) {
    var url = Route.api('/services/users/bargeinexempt')
    var service = {
      show: show,
      update: update
    }

    return service

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
  }
})()
