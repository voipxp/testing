;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterStrandedCallService',
      GroupCallCenterStrandedCallService
    )

  function GroupCallCenterStrandedCallService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/strandedcalls')
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
