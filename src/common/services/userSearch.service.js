;(function() {
  angular.module('odin.common').factory('UserSearchService', Service)

  function Service($http, Route) {
    var url = Route.api2('users')()
    return { index: index }
    function index(params) {
      return $http.get(url, { params: params }).then(function(response) {
        return response.data
      })
    }
  }
})()
