;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterOverflowService', GroupCallCenterOverflowService)

  function GroupCallCenterOverflowService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/overflow')
    var service = { show: show, update: update }
    service.options = {
      action: ['Busy', 'Transfer', 'Ringing'],
      timeoutSeconds: { min: 0, max: 7200 }
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
