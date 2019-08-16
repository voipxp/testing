import angular from 'angular'

angular.module('odin.api').factory('UserEventService', UserEventService)

UserEventService.$inject = ['$http', 'Route']
function UserEventService($http, Route) {
  var url = Route.api('/users/events')
  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  return service

  function index(userId, name, type) {
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

  function store(event) {
    return $http.post(url(), event).then(function(response) {
      return response.data
    })
  }

  function show(userId, name, type, eventName) {
    return $http
      .get(url(), {
        params: {
          userId: userId,
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
          userId: event.userId,
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
