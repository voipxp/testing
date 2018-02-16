;(function() {
  angular.module('odin.group').factory('GroupEventService', GroupEventService)

  function GroupEventService($http, Route) {
    var route = Route.api('/services/groups/events')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(
      serviceProviderId,
      groupId,
      scheduleName,
      scheduleType,
      eventName
    ) {
      return route(
        serviceProviderId,
        groupId,
        scheduleName,
        scheduleType,
        eventName
      )
    }

    function index(serviceProviderId, groupId, scheduleName, scheduleType) {
      return $http
        .get(url(serviceProviderId, groupId, scheduleName, scheduleType))
        .then(function(response) {
          return response.data
        })
    }

    function store(
      serviceProviderId,
      groupId,
      scheduleName,
      scheduleType,
      event
    ) {
      return $http
        .post(
          url(serviceProviderId, groupId, scheduleName, scheduleType),
          event
        )
        .then(function(response) {
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
        .get(
          url(serviceProviderId, groupId, scheduleName, scheduleType, eventName)
        )
        .then(function(response) {
          return response.data
        })
    }

    function update(
      serviceProviderId,
      groupId,
      scheduleName,
      scheduleType,
      event
    ) {
      return $http
        .put(
          url(
            serviceProviderId,
            groupId,
            scheduleName,
            scheduleType,
            event.eventName
          ),
          event
        )
        .then(function(response) {
          return response.data
        })
    }

    function destroy(
      serviceProviderId,
      groupId,
      scheduleName,
      scheduleType,
      eventName
    ) {
      return $http
        .delete(
          url(serviceProviderId, groupId, scheduleName, scheduleType, eventName)
        )
        .then(function(response) {
          return response.data
        })
    }
  }
})()
