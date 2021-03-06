import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserCallPoliciesService', UserCallPoliciesService)

UserCallPoliciesService.$inject = ['$http', 'Route']
function UserCallPoliciesService($http, Route) {
  var service = { show: show, update: update }
  var url = Route.api('/users/call-policies')
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

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(policies) {
    return $http.put(url(), policies).then(function(response) {
      return response.data
    })
  }
}
