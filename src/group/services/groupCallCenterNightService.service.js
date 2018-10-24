;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterNightServiceService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/night-service')
    var service = { show: show, update: update }
    service.options = {
      audioMessageSource: ['File', 'URL', 'Default'],
      action: ['None', 'Busy', 'Transfer'],
      announcementMode: ['Normal Announcement', 'Manual Announcement']
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
