import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserScheduleService', UserScheduleService)

UserScheduleService.$inject = ['$http', 'Route', 'CacheFactory']
function UserScheduleService($http, Route, CacheFactory) {
  var service = { index: index, holidays: holidays }
  var cache = CacheFactory('UserScheduleService')
  var url = Route.api('/users/schedules')
  return service

  function index(userId) {
    return $http
      .get(url(), { params: { userId: userId }, cache: cache })
      .then(function(response) {
        return response.data
      })
  }

  function holidays(userId) {
    return $http
      .get(url('holidays'), { params: { userId: userId }, cache: cache })
      .then(function(response) {
        return response.data
      })
  }
}
