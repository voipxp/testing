;(function() {
  angular.module('odin.settings').factory('CallbackTemplateService', Service)

  function Service($http, Route) {
    var url = Route.api2('/callbacks/templates')
    var service = { index, show }
    return service

    function index() {
      return $http.get(url()).then(res => res.data)
    }

    function show(id) {
      return $http.get(url(), { params: { id } }).then(res => res.data)
    }
  }
})()
