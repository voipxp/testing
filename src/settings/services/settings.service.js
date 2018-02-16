;(function() {
  angular.module('odin.settings').factory('SettingService', SettingService)

  function SettingService($http, Route) {
    var url = Route.api('settings')
    var service = {
      index: index,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function index() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }

    function show(key) {
      return $http.get(url(key)).then(function(response) {
        return response.data
      })
    }

    function update(key, value) {
      return $http.put(url(key), value).then(function(response) {
        return response.data
      })
    }

    function destroy(key) {
      return $http.delete(url(key)).then(function(response) {
        return response.data
      })
    }
  }
})()
