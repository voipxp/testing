import angular from 'angular'

angular.module('odin.api').factory('WebhookService', WebhookService)

WebhookService.$inject = ['$http', 'Route']
function WebhookService($http, Route) {
  var url = Route.api('/webhooks')
  var service = { index, show }
  return service

  function index(limit) {
    return $http
      .get(url(), { params: { limit } })
      .then(response => response.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }
}
