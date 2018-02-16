;(function() {
  angular
    .module('odin.group')
    .factory('GroupDepartmentAdminService', GroupDepartmentAdminService)

  function GroupDepartmentAdminService($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, name, admin) {
      var adminId = (admin && admin.administratorID) || admin
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'departments',
        name,
        'admins'
      )(adminId)
    }

    function index(serviceProviderId, groupId, name) {
      return $http
        .get(url(serviceProviderId, groupId, name))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, name, admin) {
      return $http
        .post(url(serviceProviderId, groupId, name), admin)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, name, admin) {
      return $http
        .get(url(serviceProviderId, groupId, name, admin))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, name, admin) {
      return $http
        .put(url(serviceProviderId, groupId, name, admin), admin)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, name, admin) {
      return $http
        .delete(url(serviceProviderId, groupId, name, admin))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
