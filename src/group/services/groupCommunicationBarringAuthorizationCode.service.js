;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCommunicationBarringAuthorizationCodeService',
      GroupCommunicationBarringAuthorizationCodeService
    )

  function GroupCommunicationBarringAuthorizationCodeService($http, Route) {
    var service = { index: index, create: create, destroy: destroy }
    return service

    function url(serviceProviderId, groupId, code) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'communicationbarring',
        'authorizationcodes',
        code
      )()
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function create(serviceProviderId, groupId, obj) {
      return $http
        .post(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, code) {
      return $http
        .delete(url(serviceProviderId, groupId, code))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
