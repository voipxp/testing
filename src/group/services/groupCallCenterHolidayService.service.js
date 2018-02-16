;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterHolidayServiceService',
      GroupCallCenterHolidayServiceService
    )

  function GroupCallCenterHolidayServiceService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/holidayservice')
    var service = { show: show, update: update }
    service.options = {
      audioMessageSource: ['File', 'URL', 'Default'],
      action: ['None', 'Busy', 'Transfer']
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
