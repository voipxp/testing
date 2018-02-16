;(function() {
  angular
    .module('odin.group')
    .factory('GroupScheduleService', GroupScheduleService)

  function GroupScheduleService($http, Route) {
    var url = Route.api('/services/groups/schedules')
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
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, schedule) {
      return $http
        .post(url(serviceProviderId, groupId), schedule)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, name, type) {
      return $http
        .get(url(serviceProviderId, groupId, name, type))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, name, type, schedule) {
      return $http
        .put(url(serviceProviderId, groupId, name, type), schedule)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, name, type) {
      return $http
        .delete(url(serviceProviderId, groupId, name, type))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
