;(function() {
  angular
    .module('odin.group')
    .factory('GroupScheduleService', GroupScheduleService)

  function GroupScheduleService($http, Route) {
    var url = Route.api2('/services/groups/schedules')()
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url, {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(schedule) {
      return $http.post(url, schedule).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, scheduleName, scheduleType) {
      return $http
        .get(url, {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            scheduleName: scheduleName,
            scheduleType: scheduleType
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(schedule) {
      return $http.put(url, schedule).then(function(response) {
        return response.data
      })
    }

    function destroy(schedule) {
      return $http
        .delete(url, {
          params: {
            serviceProviderId: schedule.serviceProviderId,
            groupId: schedule.groupId,
            scheduleName: schedule.scheduleName,
            scheduleType: schedule.scheduleType
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
