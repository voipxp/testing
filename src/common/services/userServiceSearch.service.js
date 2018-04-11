;(function() {
  angular.module('odin.common').factory('UserServiceSearchService', Service)

  function Service($http, Route) {
    var url = Route.api('services', 'users')()
    return { index: index }
    function index(params) {
      return $http.get(url, { params: params }).then(function(response) {
        return response.data
      })
    }
  }
})()
