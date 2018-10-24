;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterDistinctiveRingingService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/distinctive-ringing')
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
