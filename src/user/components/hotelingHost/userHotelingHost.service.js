;(function() {
  angular
    .module('odin.user')
    .factory('UserHotelingHostService', UserHotelingHostService)

  function UserHotelingHostService($http, Route) {
    var url = Route.api('/users/hoteling-host')
    var service = { index: index, show: show, update: update, bulk: bulk }
    service.options = {
      accessLevels: ['Enterprise', 'Group'],
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
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function bulk(data) {
      return $http.put(url('bulk'), data).then(function(response) {
        return response.data
      })
    }
  }
})()
