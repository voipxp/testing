import angular from 'angular'

angular.module('odin.api').factory('UserMeetMeConferencingConferencesService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/meet-me-conferencing')

  var service = {
    bridges: bridges,
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  service.options = {
    attendeeNotification: ['No Notification', 'Play Tone', 'Play Recorded Name']
  }
  return service

  function bridges(userId) {
    return $http.get(url('bridges'), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function index(userId) {
    return $http.get(url('conferences'), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function store(userId, bridgeId, object) {
    return $http.post(url('conferences'), object).then(function(response) {
      return response.data
    })
  }

  function show(userId, conferenceId, bridgeId) {
    return $http
      .get(url('conferences'), {
        params: {
          userId: userId,
          conferenceId: conferenceId,
          bridgeId: bridgeId
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, conferenceId, bridgeId, object) {
    return $http.put(url('conferences'), object).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, conferenceId, bridgeId) {
    return $http
      .delete(url('conferences'), {
        params: {
          userId: userId,
          conferenceId: conferenceId,
          bridgeId: bridgeId
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
