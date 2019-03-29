import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupMeetMeConferencingBridgeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/meet-me-conferencing/bridges')

  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
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

  function store(obj) {
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
      .delete(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }
}
