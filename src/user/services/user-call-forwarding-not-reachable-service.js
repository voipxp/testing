import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserCallForwardingNotReachableService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/call-forwarding-not-reachable')
  var service = { index: index, show: show, update: update, bulk: bulk }
  service.options = {
    outgoingDNorSIPURI: { minimum: 1, maximum: 161 }
  }

  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url('bulk'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(function(response) {
      return response.data
    })
  }
}
