;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterAnnouncementService',
      GroupCallCenterAnnouncementService
    )

  function GroupCallCenterAnnouncementService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/announcements')
    var service = { show: show, update: update }

    service.options = {
      audioMessageSource: ['File', 'URL', 'Default'],
      audioMessageSourceMusicOnHold: ['Default', 'URL', 'Custom', 'External'],
      timeBetweenComfortMessagesSeconds: { min: 10, max: 600 },
      timeBetweenEWMUpdatesSeconds: { min: 10, max: 600 },
      operatingMode: [
        { description: 'Announce Queue Position', key: 'Position' },
        { description: 'Announce Wait Time', key: 'Time' }
      ],
      maximumPositions: { min: 1, max: 100 }
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
