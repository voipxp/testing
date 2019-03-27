;(function() {
  angular.module('odin.user').factory('UserAdviceOfChargeService', Controller)

  function Controller($http, Route) {
    var url = Route.api('/users/advice-of-charge')
    var service = {
      show: show,
      update: update
    }
    service.options = {
      aocTypes: ['During Call', 'End Of Call']
    }
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
