;(function() {
  angular.module('odin.settings').factory('CallbackTemplateService', Service)

  function Service($http, Route) {
    var url = Route.api('callbacks/templates')
    var service = { index: index, show: show }
    return service

    function index() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
