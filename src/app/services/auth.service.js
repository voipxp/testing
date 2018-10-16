;(function() {
  angular.module('odin.app').factory('Auth', Auth)

  function Auth($http, Route) {
    var service = { token: token, password: password, session: session }
    var url = Route.api2('auth')
    return service

    // obtain a user token
    function token(username, password) {
      return $http
        .post(url('token'), { username, password })
        .then(res => res.data)
    }

    function password(oldPassword, newPassword, userId) {
      var obj = { userId, newPassword }
      if (oldPassword) {
        obj['oldPassword'] = oldPassword
      }
      return $http.put(url('password'), obj).then(res => res.data)
    }

    // load the session information about the logged in user
    function session() {
      return $http.get(url('session')).then(res => res.data)
    }
  }
})()
