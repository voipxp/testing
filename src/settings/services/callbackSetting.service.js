;(function() {
  angular.module('odin.settings').factory('CallbackSettingService', Service)

  function Service($http, Route) {
    var url = Route.api('callbacks/settings')
    var service = {
      index: index,
      store: store,
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

    function store(settings) {
      return $http.post(url(), settings).then(function(response) {
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, settings) {
      return $http.put(url(id), settings).then(function(response) {
        return response.data
      })
    }

    function destroy(id) {
      return $http.delete(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
