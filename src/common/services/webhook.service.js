;(function() {
  angular.module('odin.common').factory('WebhookService', WebhookService)

  function WebhookService($http, Route) {
    var url = Route.api('webhooks')
    var service = { index: index, show: show }
    return service

    function index(limit) {
      return $http
        .get(url(), { params: { limit: limit } })
        .then(function(response) {
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
