;(function() {
  angular
    .module('odin.group')
    .factory('GroupCollaborateService', GroupCollaborateService)

  function GroupCollaborateService($http, Route) {
    var url = Route.api2('/groups/collaborate')

    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      users: users
    }

    service.options = {
      maximumBridgeParticipantsMin: 3,
      maximumBridgeParticipantsMax: 999999,
      roomIdLengthMax: 15,
      instantRoomIdleTimeoutSecondsMin: 1,
      instantRoomIdleTimeoutSecondsMax: 3600,
      roomMaximumDurationMinutesMin: 1,
      roomMaximumDurationMinutesMax: 7200,
      roomMaximumParticipantsMin: 3,
      roomMaximumParticipantsMax: 30
    }
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

    function users(serviceProviderId, groupId) {
      return $http
        .get(url('users'), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceUserId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId) {
      return $http
        .delete(url(), { serviceUserId: serviceUserId })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
