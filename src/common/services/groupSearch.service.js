;(function() {
  angular.module('odin.common').factory('GroupSearchService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups')
    return { index }
    function index(params) {
      return $http.get(url(), { params }).then(res => res.data)
    }
  }
})()
