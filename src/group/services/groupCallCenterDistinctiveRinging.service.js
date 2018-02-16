;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterDistinctiveRingingService',
      GroupCallCenterDistinctiveRingingService
    )

  function GroupCallCenterDistinctiveRingingService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/distinctiveringing')
    var service = { show: show, update: update }
    service.options = {
      ringPattern: [
        'Normal',
        'Long-Long',
        'Short-Short-Long',
        'Short-Long-Short'
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
