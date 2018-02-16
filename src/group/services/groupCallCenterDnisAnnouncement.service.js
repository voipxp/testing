;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterDnisAnnouncementService',
      GroupCallCenterDnisAnnouncementService
    )

  function GroupCallCenterDnisAnnouncementService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/dnis')
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

    function url(serviceUserId, name) {
      return _url(serviceUserId, 'announcements', name)
    }

    function show(serviceUserId, name) {
      return $http.get(url(serviceUserId, name)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, name, obj) {
      return $http.put(url(serviceUserId, name), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
