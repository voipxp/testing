import angular from 'angular'

angular.module('odin.api').factory('UserHotelingGuestService', UserHotelingGuestService)

UserHotelingGuestService.$inject = ['$http', 'Route']
function UserHotelingGuestService($http, Route) {
  var url = Route.api('/users/hoteling-guest')
  var service = {
    show: show,
    update: update,
    index: index,
    bulk: bulk,
    users: users
  }
  service.options = {
    minAssociationLimitHours: 1,
    maxAssociationLimitHours: 999
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
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function users(userId) {
    return $http.get(url('users'), { params: { userId: userId } }).then(function(response) {
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
