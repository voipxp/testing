;(function() {
  angular
    .module('odin.user')
    .factory('UserCollaborateProjectRoomService', Service)

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
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
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

    function update(userId, roomId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function store(userId, obj) {
      return $http.post(url(), obj).then(function(response) {
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
})()
