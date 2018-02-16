;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupMeetMeConferencingBridgeService',
      GroupMeetMeConferencingBridgeService
    )

  function GroupMeetMeConferencingBridgeService($http, Route) {
    var url = Route.api('/services/groups/meetmeconferencing/bridges')

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

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(id) {
      return $http.delete(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
