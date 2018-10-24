;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterHolidayServiceService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/holiday-service')
    var service = { show: show, update: update }
    service.options = {
      audioMessageSource: ['File', 'URL', 'Default'],
      action: ['None', 'Busy', 'Transfer']
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
