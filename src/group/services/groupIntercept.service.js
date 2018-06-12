;(function() {
  angular.module('odin.group').factory('GroupInterceptService', Service)

  function Service($http, Route) {
    var url = Route.api('/services/groups/intercept')

    var service = {
      index: index,
      update: update
    }
    service.options = {
      announcementSelection: ['Personal', 'Default'],
      mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'],
      interceptInboundCalls: ['Intercept All', 'Allow All', 'Allow System Dns'],
      outboundCallOptions: [
        'Block All Outbound Calls',
        'Route to Phone Number',
        'Allow Outbound Local Calls'
      ]
    }

    return service
    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
