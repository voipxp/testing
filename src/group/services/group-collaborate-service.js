import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCollaborateService', GroupCollaborateService)

GroupCollaborateService.$inject = ['$http', 'Route']
function GroupCollaborateService($http, Route) {
  var url = Route.api('/groups/collaborate')

  var service = {
    index: index,
    details: details,
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
      .get(url('bridges'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }
  function details(serviceProviderId, groupId) {
    return $http
      .get(url('bridges', 'details'), {
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
    return $http.post(url('bridges'), obj).then(function(response) {
      return response.data
    })
  }

  function show(serviceUserId) {
    return $http
      .get(url('bridges'), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, obj) {
    return $http.put(url('bridges'), obj).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceUserId) {
    return $http
      .delete(url('bridges'), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }
}
