;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCollaborateProjectRoomService',
      UserCollaborateProjectRoomService
    )

  function UserCollaborateProjectRoomService($http, Route) {
    var url = Route.api('/services/users/collaborate')

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
      return $http.get(url(userId) + '/projectroom').then(function(response) {
        return response.data
      })
    }

    function show(userId, roomId) {
      return $http
        .get(url(userId) + '/projectroom/' + roomId)
        .then(function(response) {
          return response.data
        })
    }
    function update(userId, roomId, obj) {
      return $http
        .put(url(userId) + '/projectroom/' + roomId, obj)
        .then(function(response) {
          return response.data
        })
    }
    function store(userId, obj) {
      return $http
        .post(url(userId) + '/projectroom', obj)
        .then(function(response) {
          return response.data
        })
    }
    function destroy(userId, roomId) {
      return $http
        .delete(url(userId) + '/projectroom/' + roomId)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
