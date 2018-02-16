;(function() {
  angular
    .module('odin.group')
    .factory('GroupHuntGroupService', GroupHuntGroupService)

  function GroupHuntGroupService($http, Route) {
    var url = Route.api('/services/groups/huntgroups')

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
        .put(url(), { instances: [huntgroup] })
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(huntgroup) {
      return $http
        .put(url(huntgroup.serviceUserId), huntgroup)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceUserId) {
      return $http.delete(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }
  }
})()
