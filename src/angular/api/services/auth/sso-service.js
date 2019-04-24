import angular from 'angular'

angular.module('odin.api').factory('SsoService', SsoService)

SsoService.$inject = ['$http', 'Route']
function SsoService($http, Route) {
  const service = { show: show }
  const url = Route.api('/auth/sso')
  return service

  function show(partnerId) {
    return $http.put(url(), { partnerId }).then(response => response.data)
  }
}
