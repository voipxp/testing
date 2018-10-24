;(function() {
  angular.module('odin.app').factory('Application', Application)

  function Application($http, Route) {
    var url = Route.api('/ui/applications')
    var service = { index }
    return service

    function index() {
      return $http.get(url()).then(res => res.data)
    }
  }
})()
