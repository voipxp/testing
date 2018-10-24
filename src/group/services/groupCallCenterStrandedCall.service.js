;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterStrandedCallService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/stranded-calls')
    var service = { show: show, update: update }
    service.options = {
      action: [
        { key: 'None', description: 'Leave in Queue' },
        { key: 'Busy', description: 'Perform Busy Treatment' },
        { key: 'Transfer', description: 'Transfer To' },
        { key: 'Night Service', description: 'Night Service' },
        { key: 'Ringing', description: 'Ring until Hang up' },
        { key: 'Announcement', description: 'Announcement until Hang up' }
      ]
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
