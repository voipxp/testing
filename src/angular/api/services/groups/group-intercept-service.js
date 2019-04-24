import angular from 'angular'

angular.module('odin.api').factory('GroupInterceptService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/intercept')

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
  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
