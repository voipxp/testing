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

    var url = Route.api2('services', 'groups', 'callpickup')
    return service

    function users(serviceProviderId, groupId) {
      return $http
        .get(url('users'), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url('groups'), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(group) {
      return $http.post(url('groups'), group).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, name) {
      return $http
        .get(url('groups'), {
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

    function update(group) {
      return $http.put(url('groups'), group).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url('groups'), {
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
  }
})()
