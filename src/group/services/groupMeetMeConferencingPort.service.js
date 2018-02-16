;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupMeetMeConferencingPortService',
      GroupMeetMeConferencingPortService
    )

  function GroupMeetMeConferencingPortService($http, Route) {
    var url = Route.api('/services/groups/meetmeconferencing/ports')

    var service = { index: index, update: update }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
