;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterDnisAnnouncementService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/dnis/announcements')
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

    function show(serviceUserId, name) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId, name: name } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, name, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
