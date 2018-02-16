;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanAuthorizationCodeService',
      UserOutgoingCallingPlanAuthorizationCodeService
    )

  function UserOutgoingCallingPlanAuthorizationCodeService($http, Route) {
    var service = {
      show: show,
      update: update,
      index: index,
      create: create,
      destroy: destroy
    }
    return service

    function url(id, nested, codeId) {
      var path = nested ? 'codes' : null
      return Route.api('users')(
        id,
        'callingplans',
        'outgoing',
        'authorizationcode',
        path,
        codeId
      )
    }

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

    function index(userId) {
      return $http.get(url(userId, true)).then(function(response) {
        return response.data
      })
    }

    function create(userId, obj) {
      return $http.post(url(userId, true), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, code) {
      var codeId = code.code || code
      return $http.delete(url(userId, true, codeId)).then(function(response) {
        return response.data
      })
    }
  }
})()
