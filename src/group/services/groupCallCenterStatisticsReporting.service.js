;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterStatisticsReportingService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/reporting')
    var service = { show: show, update: update }

    service.options = {
      collectionPeriodMinutes: [15, 30, 60],
      statisticsSource: [
        'None',
        'Application Server',
        'External Reporting Server'
      ]
    }

    return service

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
