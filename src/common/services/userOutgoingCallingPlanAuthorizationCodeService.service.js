;(function() {
  angular
    .module('odin.common')
    .factory('UserOutgoingCallingPlanAuthorizationCodeService', Service)

  function Service($http, Route) {
    var service = {
      show,
      update,
      index,
      create,
      destroy
    }
    var url = Route.api2('/users/calling-plans/outgoing/authorization-codes')
    return service

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function index(userId) {
      return $http
        .get(url('codes'), { params: { userId } })
        .then(res => res.data)
    }

    function create(userId, obj) {
      return $http.post(url('codes'), obj).then(res => res.data)
    }

    function destroy(userId, code) {
      return $http
        .delete(url('codes'), { params: { userId, code: code.code || code } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
