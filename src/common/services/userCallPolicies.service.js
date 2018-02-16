;(function() {
  angular
    .module('odin.common')
    .factory('UserCallPoliciesService', UserCallPoliciesService)

  function UserCallPoliciesService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      redirectedCallsCOLPPrivacy: [
        'No Privacy',
        'Privacy For External Calls',
        'Privacy For All Calls'
      ],
      callBeingForwardedResponseCallType: [
        'Never',
        'Internal Calls',
        'All Calls'
      ],
      callingLineIdentityForRedirectedCalls: [
        'Originating Identity',
        'Redirecting User Identity For External Redirections',
        'Redirecting User Identity For All Redirections'
      ]
    }
    return service

    function url(id) {
      return Route.api('users')(id, 'callpolicies')
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
  }
})()
