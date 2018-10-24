;(function() {
  angular.module('odin.group').factory('GroupCallParkGroupService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-park/groups')

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

    function users(serviceProviderId, groupId, name) {
      return $http
        .get(url('users'), {
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

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
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
      return $http.post(url(), group).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, name) {
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

    function update(group) {
      return $http.put(url(), group).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, groupId, name) {
      return $http
        .delete(url(), {
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
