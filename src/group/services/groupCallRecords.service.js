;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallRecordsService', GroupCallRecordsService)

  function GroupCallRecordsService($http, Route) {
    var route = Route.api('/callrecords/groups')
    var service = {
      detail: detail,
      received: received,
      placed: placed,
      missed: missed,
      usersummary: usersummary,
      stats: stats,
      open: open,
      get: get
    }

    service.options = {
      reportType: [
        'detail',
        'received',
        'placed',
        'missed',
        'usersummary',
        'stats'
      ]
    }

    return service

    function url(serviceProviderId, groupId, type) {
      return route(serviceProviderId, groupId, type)
    }

    function detail(serviceProviderId, groupId, startTime, endTime, bypass) {
      return get(
        serviceProviderId,
        groupId,
        startTime,
        endTime,
        'detail',
        bypass
      )
    }

    function received(serviceProviderId, groupId, startTime, endTime) {
      return get(serviceProviderId, groupId, startTime, endTime, 'received')
    }

    function placed(serviceProviderId, groupId, startTime, endTime) {
      return get(serviceProviderId, groupId, startTime, endTime, 'placed')
    }

    function missed(serviceProviderId, groupId, startTime, endTime) {
      return get(serviceProviderId, groupId, startTime, endTime, 'missed')
    }

    function usersummary(serviceProviderId, groupId, startTime, endTime) {
      return get(serviceProviderId, groupId, startTime, endTime, 'usersummary')
    }

    function stats(serviceProviderId, groupId, startTime, endTime) {
      return get(serviceProviderId, groupId, startTime, endTime, 'stats')
    }

    function get(
      serviceProviderId,
      groupId,
      startTime,
      endTime,
      reportType,
      bypass
    ) {
      var params = { startTime: startTime.toJSON(), endTime: endTime.toJSON() }
      if (bypass) {
        params['limit'] = false
      }
      return $http
        .get(url(serviceProviderId, groupId, reportType.toLowerCase()), {
          params: params
        })
        .then(function(response) {
          return response.data
        })
    }

    function open(serviceProviderId, groupId, startTime, endTime) {
      Route.open('groups', serviceProviderId, groupId, 'callRecords', 'group')(
        startTime && startTime.toJSON(),
        endTime && endTime.toJSON()
      ).hash(null)
    }
  }
})()
