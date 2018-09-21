;(function() {
  angular.module('odin.app').factory('Auth', Auth)

  function Auth($http, Route) {
    var service = { token: token, password: password, session: session }
    var url = Route.api2('auth')
    return service

    // obtain a user token
    function token(username, password) {
      return $http
        .post(url('token'), { username: username, password: password })
        .then(function(response) {
          return response.data
        })
    }

    function password(oldPassword, newPassword, userId) {
      var obj = { newPassword: newPassword }
      if (oldPassword) {
        obj['oldPassword'] = oldPassword
      }
      return $http.put(url('password', userId), obj).then(function(response) {
        return response.data
      })
    }

    // load the session information about the logged in user
    function session() {
      return $http.get(url('session')).then(function(response) {
        return response.data
      })
    }
  }
})()
