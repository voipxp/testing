import angular from 'angular'

angular.module('odin.common').factory('WebhookService', WebhookService)

WebhookService.$inject = ['$http', 'Route']
function WebhookService($http, Route) {
  var url = Route.api('/webhooks')
  var service = { index, show }
  return service

  function index(limit) {
    return $http.get(url(), { params: { limit } }).then(res => res.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(res => res.data)
  }
}
