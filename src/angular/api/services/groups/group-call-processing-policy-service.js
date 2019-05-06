import angular from 'angular'

angular.module('odin.api').factory('GroupCallProcessingPolicyService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-processing-policy')
  var service = { show: show, update: update }
  service.options = {
    clidPolicy: ['Use DN', 'Use Configurable CLID', 'Use Group CLID'],
    enterpriseCallsCLIDPolicy: [
      'Use Extension',
      'Use Location Code plus Extension',
      'Use External Calls Policy'
    ],
    groupCallsCLIDPolicy: [
      'Use Extension',
      'Use Location Code plus Extension',
      'Use External Calls Policy'
    ],
    emergencyClidPolicy: ['Use DN', 'Use Configurable CLID', 'Use Group CLID']
  }

  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId
        }
      })
      .then(function(response) {
        return response.data
      })
  }
  function update(serviceProviderId, groupId, object) {
    return $http
      .put(url(), { serviceProviderId, groupId, ...object })
      .then(function(response) {
        return response.data
      })
  }
}
