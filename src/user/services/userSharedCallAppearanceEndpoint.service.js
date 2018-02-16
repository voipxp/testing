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
    return service

    function url(userId) {
      return Route.api('/services/users/sharedcallappearance')(
        userId,
        'endpoints'
      )
    }

    function show(userId, endpoint) {
      return $http
        .get(url(userId), {
          params: {
            deviceName: endpoint.deviceName,
            deviceLevel: endpoint.deviceLevel,
            linePort: endpoint.linePort
          }
        })
        .then(function(response) {
          return response.data
        })
    }
    function store(id, obj) {
      return $http.post(url(id), obj).then(function(response) {
        return response.data
      })
    }
    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
    function destroy(id, obj) {
      return $http.delete(url(id), { data: obj }).then(function(response) {
        return response.data
      })
    }
  }
})()
