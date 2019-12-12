	import angular from 'angular'

angular.module('odin.api').factory('SipAuthPasswordRulesService', SipAuthPasswordRulesService)

SipAuthPasswordRulesService.$inject = ['$http', 'Route']
function SipAuthPasswordRulesService($http, Route) {
  var service = { show }	
  var url = Route.api('/service-providers/sip-authentication-password-rules')
  return service

  function show( serviceProviderId ) {
    return $http
      .get(url(), { params: { serviceProviderId} })
      .then(response => response.data)
  }
 
}



