;(function() {
  angular.module('odin.branding').factory('SsoService', Service)

  function Service($http, Route) {
    var service = { show: show }
    var url = Route.api('auth', 'sso')
    return service

    function show(partner) {
      return $http.put(url(partner)).then(function(response) {
        return response.data
      })
    }
  }
})()
