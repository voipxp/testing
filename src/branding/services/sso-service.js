import angular from 'angular'

angular.module('odin.branding').factory('SsoService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show: show }
  var url = Route.api('/auth/sso')
  return service

  function show(partnerId) {
    return $http.put(url(), { partnerId }).then(response => response.data)
  }
}
