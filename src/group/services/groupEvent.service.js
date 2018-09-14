;(function() {
  angular.module('odin.group').factory('GroupEventService', GroupEventService)

  function GroupEventService($http, Route) {
    var url = Route.api('/services/groups/events')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function index(serviceProviderId, groupId, scheduleName, scheduleType) {
      return $http
        .get(url(), {
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

    function store(event) {
      return $http.post(url(), event).then(function(response) {
        return response.data
      })
    }

    function show(
      serviceProviderId,
      groupId,
      scheduleName,
      scheduleType,
      eventName
    ) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            scheduleName: scheduleName,
            scheduleType: scheduleType,
            eventName: eventName
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(event) {
      return $http.put(url(), event).then(function(response) {
        return response.data
      })
    }

    function destroy(event) {
      return $http
        .delete(url(), {
          params: {
            serviceProviderId: event.serviceProviderId,
            groupId: event.groupId,
            scheduleName: event.scheduleName,
            scheduleType: event.scheduleType,
            eventName: event.eventName
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
