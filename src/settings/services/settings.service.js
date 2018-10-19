;(function() {
  angular.module('odin.settings').factory('SettingService', SettingService)

  function SettingService($http, Route) {
    var url = Route.api2('/settings')
    var service = { index, show, update, destroy }
    return service

    function index() {
      return $http.get(url()).then(res => res.data)
    }

    function show(key) {
      return $http.get(url(key)).then(res => res.data)
    }

    function update(key, value) {
      return $http.put(url(key), value).then(res => res.data)
    }

    function destroy(key) {
      return $http.delete(url(key)).then(res => res.data)
    }
  }
})()
