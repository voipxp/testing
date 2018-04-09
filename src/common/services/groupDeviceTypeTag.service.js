;(function() {
  angular.module('odin.common').factory('GroupDeviceTypeTagService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, deviceType, tagName) {
      return Route.api()(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devicetypes',
        deviceType,
        'tags',
        tagName
      )
    }

    function index(serviceProviderId, groupId, deviceType) {
      return $http
        .get(url(serviceProviderId, groupId, deviceType))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, deviceType, tag) {
      return $http
        .post(url(serviceProviderId, groupId, deviceType), tag)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, deviceType, tagName, tag) {
      return $http
        .put(url(serviceProviderId, groupId, deviceType, tagName), tag)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, deviceType, tagName) {
      return $http
        .delete(url(serviceProviderId, groupId, deviceType, tagName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
