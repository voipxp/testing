;(function() {
  angular.module('odin.app').factory('Application', Application)

  function Application($http, Route) {
    var url = Route.ui('applications')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }
  }
})()
