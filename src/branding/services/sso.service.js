;(function() {
  angular.module('odin.branding').factory('SsoService', Service)

  function Service($http, Route) {
    var service = { show: show }
    var url = Route.api2('/auth/sso')
    return service

    function show(partnerId) {
      return $http.put(url(), { partnerId }).then(res => res.data)
    }
  }
})()
