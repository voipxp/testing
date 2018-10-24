;(function() {
  angular.module('odin.user').factory('UserPriorityAlertService', Service)

  function Service($http, Route) {
    var url = Route.api('/users/priority-alert')
    var service = { show: show, update: update }
    service.options = {}
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
