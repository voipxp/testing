;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterOverflowService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/overflow')
    var service = { show: show, update: update }
    service.options = {
      action: ['Busy', 'Transfer', 'Ringing'],
      timeoutSeconds: { min: 0, max: 7200 }
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
