;(function() {
  angular
    .module('odin.group')
    .factory('GroupMusicOnHoldService', GroupMusicOnHoldService)

  function GroupMusicOnHoldService($http, Route, GroupDepartmentService) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      messageSourceSelections: ['System', 'Custom', 'External'],
      audioFileCodecs: ['None', 'G711', 'G722', 'G729', 'G726', 'AMR', 'AMR-WB']
    }

    var route = Route.api('services', 'groups')
    return service

    function url(serviceProviderId, groupId, department) {
      var departmentId = GroupDepartmentService.toId(department)
      return route(serviceProviderId, groupId, 'musiconhold', departmentId)
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, moh) {
      return $http
        .post(url(serviceProviderId, groupId), moh)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, departmentId) {
      return $http
        .get(url(serviceProviderId, groupId, departmentId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, moh) {
      var department = moh && moh.department
      return $http
        .put(url(serviceProviderId, groupId, department), moh)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, departmentId) {
      return $http
        .delete(url(serviceProviderId, groupId, departmentId))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
