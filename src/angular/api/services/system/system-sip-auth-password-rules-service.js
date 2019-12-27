import angular from 'angular'

angular.module('odin.api').factory('SystemSipAuthPasswordRulesService', SystemSipAuthPasswordRulesService)

SystemSipAuthPasswordRulesService.$inject = ['$http', 'Route']

function SystemSipAuthPasswordRulesService($http, Route) {
  var service = { show }	
  var url = Route.api('/system/sip-authentication-password-rules')
  return service
  
  function show() {
    return $http.get(url()).then(response => response.data)
  }
 
}


