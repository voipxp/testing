import angular from 'angular'

angular.module('odin.api').factory('UserCallForwardingNoAnswerService', Service)

Service.$inject = ['$http', 'Route', 'CacheFactory']
function Service($http, Route, CacheFactory) {
  var url = Route.api('/users/call-forwarding-no-answer')
  var service = { index: index, show: show, update: update, bulk: bulk }
  service.options = {
    outgoingDNorSIPURI: { minimum: 1, maximum: 161 },
    numberOfRings: { minimum: 0, maximum: 20 }
  }
  var cache = CacheFactory('UserCallForwardingNoAnswerService')
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
      .get(url(), { params: { userId: userId }, cache: cache })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      cache.removeAll()
      return response.data
    })
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(function(response) {
      cache.removeAll()
      return response.data
    })
  }
}
