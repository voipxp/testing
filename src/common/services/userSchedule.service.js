;(function() {
  angular
    .module('odin.common')
    .factory('UserScheduleService', UserScheduleService)

  function UserScheduleService($http, Route, CacheFactory) {
    var service = { index: index }
    var cache = CacheFactory('UserScheduleService')
    return service

    function url(id, scheduleId) {
      return Route.api('users')(id, 'schedules', scheduleId)
    }

    function index(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
