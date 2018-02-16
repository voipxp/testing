;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserCommunicationBarringAuthorizationCodeService',
      UserCommunicationBarringAuthorizationCodeService
    )

  function UserCommunicationBarringAuthorizationCodeService($http, Route) {
    var service = { index: index, create: create, destroy: destroy }
    return service

    function url(id, code) {
      return Route.api('users')(
        id,
        'communicationbarring',
        'authorizationcodes',
        code
      )
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function create(userId, obj) {
      return $http.post(url(userId), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, code) {
      return $http.delete(url(userId, code)).then(function(response) {
        return response.data
      })
    }
  }
})()
