import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserBroadWorksMobilityService', UserBroadWorksMobilityService)

UserBroadWorksMobilityService.$inject = ['$http', 'Route']
function UserBroadWorksMobilityService($http, Route) {
  var url = Route.api('/users/broad-works-mobility')
  var service = { show: show, update: update }
  service.options = {
    phonesToRing: ['Fixed', 'Mobile', 'Both'],
    userSettingLevel: ['Group', 'User']
  }

  return service

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
}
