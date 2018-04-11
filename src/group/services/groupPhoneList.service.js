;(function() {
  angular.module('odin.group').factory('GroupPhoneListService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, name) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'commonphonelist',
        name
      )()
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, entry) {
      return $http
        .post(url(serviceProviderId, groupId), entry)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, name, entry) {
      return $http
        .put(url(serviceProviderId, groupId, name), entry)
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
