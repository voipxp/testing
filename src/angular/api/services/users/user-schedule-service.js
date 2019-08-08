import angular from 'angular'

angular.module('odin.api').factory('UserScheduleService', UserScheduleService)

UserScheduleService.$inject = ['$http', 'Route', 'CacheFactory']
function UserScheduleService($http, Route, CacheFactory) {
  var service = {
    index: index,
    holidays: holidays,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  var url = Route.api('/users/schedules')
  return service

  function index(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function store(schedule) {
    return $http.post(url(), schedule).then(function(response) {
      return response.data
    })
  }

  function show(userId, name, type) {
    return $http
      .get(url(), {
        params: {
          userId: userId,
          name: name,
          type: type
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(schedule) {
    return $http.put(url(), schedule).then(function(response) {
      return response.data
    })
  }

  function destroy(schedule) {
    return $http
      .delete(url(), {
        params: {
          userId: schedule.userId,
          name: schedule.name,
          type: schedule.type
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function holidays(userId) {
    return $http
      .get(url('holidays'), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }
}
