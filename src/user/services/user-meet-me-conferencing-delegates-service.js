import angular from 'angular'

angular
  .module('odin.user')
  .factory(
    'UserMeetMeConferencingDelegatesService',
    UserMeetMeConferencingDelegatesService
  )

UserMeetMeConferencingDelegatesService.$inject = ['$http', 'Route']
function UserMeetMeConferencingDelegatesService($http, Route) {
  var url = Route.api('/users/meet-me-conferencing/delegates')

  var service = {
    users: users,
    index: index,
    update: update
  }
  service.options = {}
  return service

  function users(userId, bridgeId, conferenceId) {
    return $http
      .get(url('users'), {
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

  function index(userId, bridgeId, conferenceId) {
    return $http
      .get(url(), {
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
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
