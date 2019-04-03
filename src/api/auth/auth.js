import angular from 'angular'

angular.module('odin.api').factory('Auth', Auth)

Auth.$inject = ['$http', 'Route']
function Auth($http, Route) {
  const service = { token: token, password: password, session: session }
  const url = Route.api('/auth')
  return service

  // obtain a user token
  function token(username, password) {
    return $http
      .post(url('token'), { username, password })
      .then(response => response.data)
  }

  function password(oldPassword, newPassword, userId) {
    const object = { userId, newPassword }
    if (oldPassword) {
      object['oldPassword'] = oldPassword
    }
    return $http.put(url('password'), object).then(response => response.data)
  }

  // load the session information about the logged in user
  function session() {
    return $http.get(url('session')).then(response => response.data)
  }
}
