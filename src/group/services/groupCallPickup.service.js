;(function() {
  angular.module('odin.group').factory('GroupCallPickupService', Service)

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
        'callpickup',
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
        .get(url(serviceProviderId, groupId, 'groups'))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, group) {
      return $http
        .post(url(serviceProviderId, groupId, 'groups'), group)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, name) {
      return $http
        .get(url(serviceProviderId, groupId, 'groups', name))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, group) {
      return $http
        .put(url(serviceProviderId, groupId, 'groups', group.name), group)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(serviceProviderId, groupId, 'groups', name))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
