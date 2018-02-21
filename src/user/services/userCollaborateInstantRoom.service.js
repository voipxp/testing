;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCollaborateInstantRoomService',
      UserCollaborateInstantRoomService
    )

  function UserCollaborateInstantRoomService($http, Route) {
    var url = Route.api('/services/users/collaborate')

    var service = {
      show: show,
      update: update
    }

    service.options = {
      attendeeNotification: ['No Notification', 'Play Tone']
    }
    return service

    function show(userId) {
      return $http.get(url(userId) + '/instantroom').then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http
        .put(url(userId) + '/instantroom', obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
