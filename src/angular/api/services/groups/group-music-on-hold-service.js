import angular from 'angular'

angular.module('odin.api').factory('GroupMusicOnHoldService', GroupMusicOnHoldService)

GroupMusicOnHoldService.$inject = ['$http', 'Route']
function GroupMusicOnHoldService($http, Route) {
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

  var url = Route.api('/groups/music-on-hold')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url('departments'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceProviderId, groupId, moh) {
    return $http.post(url(), moh).then(function(response) {
      return response.data
    })
  }

  function show(serviceProviderId, groupId, departmentName, isEnterpriseDepartment) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          departmentName: departmentName,
          isEnterpriseDepartment: isEnterpriseDepartment
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceProviderId, groupId, moh) {
    return $http.put(url(), moh).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, departmentName, isEnterpriseDepartment) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          departmentName: departmentName,
          isEnterpriseDepartment: isEnterpriseDepartment
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
