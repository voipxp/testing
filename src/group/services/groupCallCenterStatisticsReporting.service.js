;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterStatisticsReportingService',
      GroupCallCenterStatisticsReportingService
    )

  function GroupCallCenterStatisticsReportingService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/reporting')
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

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
