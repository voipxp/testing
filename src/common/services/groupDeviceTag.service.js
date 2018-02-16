;(function() {
  angular.module('odin.common').factory('GroupDeviceTagService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, deviceName, tagName) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devices',
        deviceName,
        'tags',
        tagName
      )()
    }

    function index(serviceProviderId, groupId, deviceName) {
      return $http
        .get(url(serviceProviderId, groupId, deviceName))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, deviceName, tag) {
      return $http
        .post(url(serviceProviderId, groupId, deviceName), tag)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, deviceName, tag) {
      return $http
        .put(url(serviceProviderId, groupId, deviceName, tag.tagName), tag)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, deviceName, tagName) {
      return $http
        .delete(url(serviceProviderId, groupId, deviceName, tagName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
