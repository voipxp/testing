import angular from 'angular'

angular.module('odin.api').factory('UserCollaborateInstantRoomService', Service)

Service.$inject = ['$http', 'Route']
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

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
