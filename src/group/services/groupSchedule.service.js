;(function() {
  angular
    .module('odin.group')
    .factory('GroupScheduleService', GroupScheduleService)

  function GroupScheduleService($http, Route) {
    var url = Route.api('/groups/schedules')
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
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(schedule) {
      return $http.post(url(), schedule).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, name, type) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
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
            serviceProviderId: schedule.serviceProviderId,
            groupId: schedule.groupId,
            name: schedule.name,
            type: schedule.type
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
