;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterQueueDispositionCodeSettingsService',
      GroupCallCenterQueueDispositionCodeSettingsService
    )

  function GroupCallCenterQueueDispositionCodeSettingsService($http, Route) {
    var url = Route.api(
      '/services/groups/callcenters/dispositioncodes/settings'
    )
    var service = { show: show, update: update }

    return service

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, settings) {
      return $http.put(url(serviceUserId), settings).then(function(response) {
        return response.data
      })
    }
  }
})()
