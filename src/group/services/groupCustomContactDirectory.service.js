;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCustomContactDirectoryService',
      GroupCustomContactDirectoryService
    )

  function GroupCustomContactDirectoryService($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      users: users
    }
    return service

    function url(serviceProviderId, groupId, name) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'customcontactdirectory'
      )(name)
    }

    function users(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId, 'users'))
        .then(function(response) {
          return response.data
        })
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, directory) {
      return $http
        .post(url(serviceProviderId, groupId, directory.name), directory)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, name) {
      return $http
        .get(url(serviceProviderId, groupId, name))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, directory) {
      return $http
        .put(url(serviceProviderId, groupId, directory.name), directory)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, directory) {
      return $http
        .delete(url(serviceProviderId, groupId, directory.name))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
