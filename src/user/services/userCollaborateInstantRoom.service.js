;(function() {
  angular
    .module('odin.user')
    .factory('UserCollaborateInstantRoomService', Service)

  function Service($http, Route) {
    var url = Route.api('/users/collaborate/instant-room')

    var service = {
      show: show,
      update: update
    }

    service.options = {
      attendeeNotification: ['No Notification', 'Play Tone']
    }
    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
