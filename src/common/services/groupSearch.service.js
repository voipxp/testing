;(function() {
  angular.module('odin.common').factory('GroupSearchService', Service)

  function Service($http, Route) {
    var url = Route.api('groups')()
    return { index: index }
    function index(params) {
      return $http.get(url, { params: params }).then(function(response) {
        return response.data
      })
    }
  }
})()
