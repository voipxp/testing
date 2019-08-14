import angular from 'angular'
angular.module('odin.api').factory('GroupCallCenterStatisticsReportingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/reporting')
  var service = { show: show, update: update }

  service.options = {
    collectionPeriodMinutes: [15, 30, 60],
    statisticsSource: ['None', 'Application Server', 'External Reporting Server']
  }

  return service

  function show(serviceUserId) {
    return $http.get(url(), { params: { serviceUserId: serviceUserId } }).then(function(response) {
      return response.data
    })
  }

  function update(serviceUserId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
