;(function() {
  angular
    .module('odin.group')
    .factory('GroupVirtualOnNetEnterpriseExtensionsService', Service)

  function Service($http, Route) {
    var service = {
      users: users,
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, section, name) {
      return Route.api(
        'services',
        'groups',
        serviceProviderId,
        groupId,
        'virtualonnetenterpriseextensions',
        section,
        name
      )()
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
        .get(url(serviceProviderId, groupId, ''))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, settings) {
      return $http
        .post(url(serviceProviderId, groupId), settings)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, phoneNumber) {
      return $http
        .get(url(serviceProviderId, groupId, '', phoneNumber))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, settings) {
      return $http
        .put(url(serviceProviderId, groupId), settings)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, phoneNumber) {
      return $http
        .delete(url(serviceProviderId, groupId, phoneNumber))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
