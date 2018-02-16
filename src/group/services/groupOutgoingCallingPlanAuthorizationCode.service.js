;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanAuthorizationCodeService',
      GroupOutgoingCallingPlanAuthorizationCodeService
    )

  function GroupOutgoingCallingPlanAuthorizationCodeService($http, Route) {
    var service = { index: index, store: store, destroy: destroy }

    return service

    function url(serviceProviderId, groupId, code) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'authorizationcodes', code)
    }

    function index(serviceProviderId, groupId, department) {
      return $http
        .get(url(serviceProviderId, groupId), {
          params: { department: department }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, obj) {
      return $http
        .post(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, code) {
      return $http
        .delete(url(serviceProviderId, groupId), { data: code })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
