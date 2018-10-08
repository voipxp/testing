;(function() {
  angular
    .module('odin.group')
    .factory('GroupHuntGroupService', GroupHuntGroupService)

  function GroupHuntGroupService($http, Route) {
    var url = Route.api2('/groups/hunt-groups')

    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      status: status
    }
    service.options = {
      policy: ['Circular', 'Regular', 'Simultaneous', 'Uniform', 'Weighted'],
      v20: [
        'allowMembersToControlGroupBusy',
        'enableGroupBusy',
        'applyGroupBusyWhenTerminatingToAgent',
        'networkClassOfService'
      ]
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

    function store(huntgroup) {
      return $http.post(url(), huntgroup).then(function(response) {
        return response.data
      })
    }

    function status(huntgroup) {
      return $http
        .put(url('status'), { instances: [huntgroup] })
        .then(function(response) {
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

    function update(huntgroup) {
      return $http.put(url(), huntgroup).then(function(response) {
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
})()
