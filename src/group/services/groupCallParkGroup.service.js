;(function() {
  angular.module('odin.group').factory('GroupCallParkGroupService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      users: users
    }
    service.options = {
      recallTo: [
        'Parking User Only',
        'Parking User Then Alternate User',
        'Alternate User Only'
      ]
    }
    return service

    function url(serviceProviderId, groupId, name, sub) {
      return Route.api(
        'services',
        'groups',
        serviceProviderId,
        groupId,
        'callpark',
        'groups',
        name,
        sub
      )()
    }

    function users(serviceProviderId, groupId, name) {
      return $http
        .get(url(serviceProviderId, groupId, name, 'users'))
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

    function store(serviceProviderId, groupId, group) {
      return $http
        .post(url(serviceProviderId, groupId), group)
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

    function update(serviceProviderId, groupId, group) {
      return $http
        .put(url(serviceProviderId, groupId, group.name), group)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(serviceProviderId, groupId, name))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
