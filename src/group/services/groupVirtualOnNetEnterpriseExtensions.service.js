;(function() {
  angular
    .module('odin.group')
    .factory('GroupVirtualOnNetEnterpriseExtensionsService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    var url = Route.api2('/groups/virtual-on-net-enterprise-extensions')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, settings) {
      return $http.post(url(), settings).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, groupId, phoneNumber) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            phoneNumber: phoneNumber
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, settings) {
      return $http.put(url(), settings).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, groupId, phoneNumber) {
      return $http
        .delete(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            phoneNumber: phoneNumber
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
