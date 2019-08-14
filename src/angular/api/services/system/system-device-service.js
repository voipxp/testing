import angular from 'angular'

angular.module('odin.api').factory('SystemDeviceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/devices')
  var service = { index, store, show, update, destroy }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(device) {
    return $http.post(url(), device).then(response => {
      return response.data
    })
  }

  function update(device) {
    return $http.put(url(), device).then(response => {
      return response.data
    })
  }

  function show(deviceName) {
    return $http.get(url(), { params: { deviceName } }).then(response => response.data)
  }

  function destroy(deviceName) {
    return $http.delete(url(), { params: { deviceName } }).then(response => {
      return response.data
    })
  }
}
