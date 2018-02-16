;(function() {
  angular.module('odin.group').factory('GroupAdminService', GroupAdminService)

  function GroupAdminService($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, admin) {
      var adminId = (admin && admin.administratorID) || admin
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('admins', adminId)
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, admin) {
      return $http
        .post(url(serviceProviderId, groupId), admin)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, admin) {
      return $http
        .get(url(serviceProviderId, groupId, admin))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, admin) {
      return $http
        .put(url(serviceProviderId, groupId, admin), admin)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, admin) {
      return $http
        .delete(url(serviceProviderId, groupId, admin))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
