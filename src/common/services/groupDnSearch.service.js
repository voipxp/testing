;(function() {
  angular.module('odin.common').factory('GroupDnSearchService', Service)

  function Service($http, Route) {
    var url = Route.api('groups', 'dns')()
    return { index: index }
    function index(params) {
      return $http.get(url, { params: params }).then(function(response) {
        return response.data
      })
    }
  }
})()
