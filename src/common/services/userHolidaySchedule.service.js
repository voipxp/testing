;(function() {
  angular
    .module('odin.common')
    .factory('UserHolidayScheduleService', UserHolidayScheduleService)

  function UserHolidayScheduleService($http, Route) {
    var service = { index: index }
    return service

    function url(id, scheduleId) {
      return Route.api('users')(id, 'holidayschedules', scheduleId)
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
  }
})()
