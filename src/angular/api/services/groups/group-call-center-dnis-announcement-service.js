import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupCallCenterDnisAnnouncementService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/dnis/announcements')
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

  function update(serviceUserId, name, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
