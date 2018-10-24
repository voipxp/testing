;(function() {
  angular.module('odin.group').factory('GroupEventService', GroupEventService)

  function GroupEventService($http, Route) {
    var url = Route.api('/groups/events')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function index(serviceProviderId, groupId, name, type) {
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

    function store(event) {
      return $http.post(url(), event).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, name, type, eventName) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            name: name,
            type: type,
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
            name: event.name,
            type: event.type,
            eventName: event.eventName
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
