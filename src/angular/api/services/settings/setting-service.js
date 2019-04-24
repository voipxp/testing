import angular from 'angular'

angular.module('odin.api').factory('SettingService', SettingService)

SettingService.$inject = ['$http', 'Route']
function SettingService($http, Route) {
  var url = Route.api('/settings')
  var service = { index, show, update, destroy }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function show(key) {
    return $http.get(url(key)).then(response => response.data)
  }

  function update(key, value) {
    return $http.put(url(key), value).then(response => response.data)
  }

  function destroy(key) {
    return $http.delete(url(key)).then(response => response.data)
  }
}
