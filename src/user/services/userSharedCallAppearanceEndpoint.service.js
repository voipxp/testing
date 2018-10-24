;(function() {
  angular
    .module('odin.provisioning')
    .factory('UserSharedCallAppearanceEndpointService', Service)

  function Service($http, Route) {
    var service = {
      show: show,
      store: store,
      update: update,
      destroy: destroy
    }
    var url = Route.api('/users/shared-call-appearance/endpoints')
    return service

    function show(userId, endpoint) {
      return $http
        .get(url(), {
          params: {
            userId: userId,
            deviceName: endpoint.deviceName,
            deviceLevel: endpoint.deviceLevel,
            linePort: endpoint.linePort
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(userId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, obj) {
      return $http.delete(url(), { data: obj }).then(function(response) {
        return response.data
      })
    }
  }
})()
