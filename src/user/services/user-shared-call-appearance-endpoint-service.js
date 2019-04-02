import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserSharedCallAppearanceEndpointService', Service)

Service.$inject = ['$http', 'Route']
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

  function store(userId, object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, object) {
    return $http.delete(url(), { data: object }).then(function(response) {
      return response.data
    })
  }
}
