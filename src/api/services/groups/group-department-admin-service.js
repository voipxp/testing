import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupDepartmentAdminService', GroupDepartmentAdminService)

GroupDepartmentAdminService.$inject = ['$http', 'Route']
function GroupDepartmentAdminService($http, Route) {
  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  var url = Route.api('/groups/departments/admins')
  return service

  function index(serviceProviderId, groupId, name) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          name: name
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(admin) {
    return $http.post(url(), admin).then(function(response) {
      return response.data
    })
  }

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(admin) {
    return $http.put(url(), admin).then(function(response) {
      return response.data
    })
  }

  function destroy(userId) {
    return $http
      .delete(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }
}
