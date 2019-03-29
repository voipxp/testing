import angular from 'angular'
angular
  .module('odin.group')
  .factory('GroupCallCenterQueueStatusService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/status')
  var service = { show: show }

  return service

  function show(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }
}
