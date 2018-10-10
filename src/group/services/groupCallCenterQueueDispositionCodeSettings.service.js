;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterQueueDispositionCodeSettingsService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/disposition-codes')
    var service = { show: show, update: update }

    return service

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, settings) {
      return $http.put(url(), settings).then(function(response) {
        return response.data
      })
    }
  }
})()
