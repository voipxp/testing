import angular from 'angular'

angular.module('odin.api').factory('UserCollaborateProjectRoomService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/collaborate/project-rooms')

  var service = {
    index: index,
    show: show,
    update: update,
    store: store,
    destroy: destroy
  }

  service.options = {
    attendeeNotification: ['No Notification', 'Play Tone']
  }
  return service

  function index(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function show(userId, roomId) {
    return $http
      .get(url(), { params: { userId: userId, roomId: roomId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, roomId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function store(userId, object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, roomId) {
    return $http
      .delete(url(), { params: { userId: userId, roomId: roomId } })
      .then(function(response) {
        return response.data
      })
  }
}
