;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterNightServiceService',
      GroupCallCenterNightServiceService
    )

  function GroupCallCenterNightServiceService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/nightservice')
    var service = { show: show, update: update }
    service.options = {
      audioMessageSource: ['File', 'URL', 'Default'],
      action: ['None', 'Busy', 'Transfer'],
      announcementMode: ['Normal Announcement', 'Manual Announcement']
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
